import axios from "axios";
import { useState, useEffect } from "react";
import { BsArchive, BsFile } from "react-icons/bs";
import { toast } from "react-toastify";
import AdminLayout from "../../../src/components/admin/AdminLayout";
import styles from "../../../styles/admin/Facility.module.css";
import { Input, Loader } from ".././../../src/components/ui/ui";

const Falility = () => {
  const [file, setfile] = useState(null);
  const [loading, setloading] = useState(false);
  const [facility, setfacility] = useState({
    name: "",
    image: { public_id: "", url: "" },
  });
  const [facilities, setfacilities] = useState([]);

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
      facility.image.url = secure_url;
      facility.image.public_id = public_id;

      console.log(uploadRes.data);

      const res = await axios.post("/api/facility", {
        facility,
      });
      if (res.status == 201) {
        toast.success("Successfully submitted your quotation");
        setloading(false);

        getFacilities();
      }
    } catch (error) {
      setloading(false);

      toast.error("Something went wrong");
    }
  };

  const getFacilities = async () => {
    setloading(true);
    const res = await axios.get("/api/facility");
    if (res.status == 200) {
      setfacilities(res.data.facilities);
    }

    setloading(false);
  };

  const deleteFacility = (id) => {
    try {
      const res = axios.delete(`/api/facility/${id}`);

      setfacilities(facilities.filter((item) => item._id !== id));
      toast.success("Successfully deleted");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getFacilities();
  }, []);

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div className={styles.wrapper}>
        <h1>Facilities</h1>
        <div className={styles.addItem}>
          <Input
            label={"Name"}
            onChange={(e) => setfacility({ ...facility, name: e.target.value })}
          />
          <div>
            <label htmlFor="fileInput">
              <BsFile />{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={(e) => setfile(e.target.files[0])}
            />
          </div>

          <button className={styles.button} onClick={addFacility}>
            Add Facility
          </button>
        </div>
        <div className={styles.items}>
          {facilities.map((item, index) => (
            <div className={styles.item} key={index}>
              <p>{item.name}</p>
              <div>
                <img src={item.image.url} alt="" />
              </div>
              <div>
                <span onClick={() => deleteFacility(item._id)}>
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

export default Falility;
