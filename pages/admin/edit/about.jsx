import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminLayout from "../../../src/components/admin/AdminLayout";
import styles from "../../../styles/admin/edit/About.module.css";

const About = () => {
  const [file, setfile] = useState(null);
  const [loading, setloading] = useState(false);
  const [about, setabout] = useState({
    text: "",
    image: { public_id: "", url: "" },
  });

  const getabout = async () => {
    const res = await axios.get("/api/about");
    setabout(res.data.about);
  };

  const addAbout = async (e) => {
    e.preventDefault();

    try {
      if (file) {
        setloading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "b2bwebsite");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/mdalif/image/upload",
          data
        );
        const { secure_url, public_id } = uploadRes.data;
        about.image.url = secure_url;
        about.image.public_id = public_id;

        console.log(uploadRes.data);
      }

      const res = await axios.put("/api/about", {
        ...about,
      });
      if (res.status == 201) {
        toast.success("Successfully added ");
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);

      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getabout();
  }, []);
  return (
    <AdminLayout>
      <div className={styles.container}>
        <form action="" className={styles.form} onSubmit={addAbout}>
          <div>
            <label htmlFor="">Picture </label>
            <input type="file" onChange={(e) => setfile(e.target.files[0])} />
          </div>

          <div>
            <textarea
              value={about.text}
              onChange={(e) => setabout({ ...about, text: e.target.value })}
            ></textarea>
          </div>
          <div>
            <button className={styles.button} onClick={addAbout}>
              Submit{" "}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default About;
