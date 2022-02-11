import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "../../styles/components/Footer.module.css";

const Footer = ({ copyText }) => {
  const { t } = useTranslation();
  const [about, setabout] = useState(null);
  const [socials, setsocials] = useState([]);

  const getData = async () => {
    const res = await axios.get("/api/footer");
    setabout(res.data.about);
    setsocials(res.data.socials);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div>
            <h2>About US</h2>
            <p>
              {about?.text.substr(0, 250)}
              <Link href={"/about"}>
                <a>Read more..</a>
              </Link>
            </p>
          </div>
          <div>
            <div>
              <Image src={"/images/logo.png"} width={300} height={120} />
            </div>
            <div className={styles.iconContainer}>
              {socials.map((item,index)=> <a href={item.url} target="_blank" key={index} >  <img src={item.image.url} alt="" /></a> )}
          
            </div>
          </div>
        </div>

        <hr className={styles.hr} />
        <div className={styles.footerBottom}>
          <span> {copyText} </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
