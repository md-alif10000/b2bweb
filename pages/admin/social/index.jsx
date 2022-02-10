import axios from "axios";
import { useState, useEffect } from "react";
import { BsArchive, BsFile } from "react-icons/bs";
import { toast } from "react-toastify";
import AdminLayout from "../../../src/components/admin/AdminLayout";
import styles from "../../../styles/admin/Facility.module.css";
import { Input, Loader } from "../../../src/components/ui/ui";

const Socials = () => {
  const [loading, setloading] = useState(false);

  const [socialInfo, setsocialInfo] = useState({
    name: "",
    url: "",
    image: { public_id: "", url: "" },
  });
  const [socials, setsocials] = useState([]);

  const addSocial = async (e) => {
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
      const res = await axios.post("/api/social", {
        ...socialInfo,
      });
      if (res.status == 201) {
        toast.success("Successfully added ");
        setloading(false);

        getSocials();
      }
    } catch (error) {
      setloading(false);

      toast.error("Something went wrong");
    }
  };

  const getSocials = async () => {
    setloading(true);
    const res = await axios.get("/api/social");
    if (res.status == 200) {
      setsocials(res.data.socials);
    }

    setloading(false);
  };

  const deleteSocial = async (id) => {
    try {
      const res = await axios.delete(`/api/social/${id}`);
      setsocials(setsocials.filter((item) => item._id !== id));
      toast.success("Successfully deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getSocials();
  }, []);

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div className={styles.wrapper}>
        <h1>Social Medias</h1>
        <div className={styles.addItem}>
          <Input
            label={"Name"}
            onChange={(e) =>
              setsocialInfo({ ...socialInfo, name: e.target.value })
            }
            value={socialInfo.name}
          />
          <Input
            label={"Url"}
            onChange={(e) =>
              setsocialInfo({ ...socialInfo, url: e.target.value })
            }
            value={socialInfo.url}
          />

          <button className={styles.button} onClick={addSocial}>
            Add Social media
          </button>
        </div>
        <div className={styles.items}>
          {socials.map((item, index) => (
            <div className={styles.item} key={index}>
              <p>{item.name}</p>

              <div>
                <span onClick={() => deleteSocial(item._id)}>
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

export default Socials;
