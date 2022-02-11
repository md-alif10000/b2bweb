import { useState, useEffect } from "react";
import Footer from "../src/components/Footer";
import PrimaryHeader from "../src/components/PrimaryHeader";
import styles from "../styles/About.module.css";

import axios from "axios";

const About = () => {
  const [data, setdata] = useState(null);
  const [socials, setsocials] = useState([]);

  const getData = async () => {
    const res = await axios.get("/api/about");
    console.log(res)

    setdata(res.data.about);
    setsocials(res.data.socials);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PrimaryHeader />
      <div className={styles.container}>
        <div className={styles.top}>
          <div>
            <h2>About Us</h2>

            <p>{data?.text}</p>
          </div>

          <div className={styles.imgContainer}>
            <img src={data?.image.url} alt="" />
            <div>
              <h2>Follow us on</h2>
              <div className={styles.iconsContainer}>
                {socials?.map((item, index) => (
                  <a href={item.url} target="_blank" rel="noreferrer" key={index}>
                    <img src={item?.image?.url} alt="" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
