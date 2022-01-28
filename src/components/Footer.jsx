import Image from "next/image";
import React from "react";
import styles from "../../styles/components/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.footerTop}>
        <div>
          <Image src={"/images/logo.png"} width={300} height={120} />
        </div>
        <div className={styles.iconContainer}>
          <img  src="/images/facebook.png" alt="" />
          <img src="/images/pintarest.png" alt="" />
          <img src="/images/insta.png" alt="" />
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.footerBottom}>
        <span>Copyright &copy; 2022 ImpoNexpo. All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
