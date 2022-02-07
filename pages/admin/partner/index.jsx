import axios from "axios";
import { useState, useEffect } from "react";
import { BsArchive, BsFile } from "react-icons/bs";
import { toast } from "react-toastify";
import AdminLayout from "../../../src/components/admin/AdminLayout";
import styles from "../../../styles/admin/Facility.module.css";
import { Input, Loader } from ".././../../src/components/ui/ui";

const Partner = () => {
  const [file, setfile] = useState(null);
  const [loading, setloading] = useState(false);
  const [partner, setPartner] = useState({
    name: "",
    image: { public_id: "", url: "" },
  });
  const [partners, setPartners] = useState([]);

  const addFacility = async (e) => {
    e.preventDefault();

    try {
      if (!file) return toast.error("Image is required");

      setloading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "b2bwebsite");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/mdalif/image/upload",
        data
      );
      const { secure_url, public_id } = uploadRes.data;
      partner.image.url = secure_url;
      partner.image.public_id = public_id;

      console.log(uploadRes.data);

      const res = await axios.post("/api/partner", {
        ...partner,
      });
      if (res.status == 201) {
        toast.success("Successfully submitted ");

        getPartners()
      }
    } catch (error) {
      console.log(error);
      setloading(false);

      toast.error("Something went wrong");
    }
  };

  const getPartners = async () => {
    setloading(true);
    const res = await axios.get("/api/partner");
    if (res.status == 200) {
      setPartners(res.data.partners);
    }
    console.log(res.data.partners);

    setloading(false);
  };

  const deletePartner = (id) => {
    try {
      const res = axios.delete(`/api/partner/${id}`);
      if (res.status == 200) {
        toast.success("Successfully deleted");
        setPartners(partners.filter((item) => (item._id = id)));
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getPartners();
  }, []);

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div className={styles.wrapper}>
        <h1>Partners</h1>
        <div className={styles.addItem}>
          <Input
          label={"Partner name"}
            onChange={(e) => setPartner({ ...partner, name: e.target.value })}
          />
          <div>
            <label htmlFor="fileInput">
              <BsFile />{" "}
            </label>
            <input
              id="fileInput"
              onChange={(e) => setfile(e.target.files[0])}
              type="file"
            />
          </div>

          <button className={styles.button} onClick={addFacility}>
            Add Partner
          </button>
        </div>
        <div className={styles.items}>
          {partners.map((item, index) => (
            <div className={styles.item} key={index}>
              <p>{item.name}</p>
              <div>
                <img src={item.image.url} alt="" />
              </div>
              <div>
                <span onClick={() => deletePartner(item._id)}>
                  <BsArchive />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Partner;
