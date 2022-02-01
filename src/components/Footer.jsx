import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../styles/components/Footer.module.css";

const Footer = () => {
  const {t}=useTranslation()
  return (
    <footer className={styles.container}>
      <div className={styles.footerTop}>
        <div>
          <Image src={"/images/logo.png"} width={300} height={120} />
        </div>
        <div className={styles.iconContainer}>
          <img src="/images/facebook.png" alt="" />
          <img src="/images/pintarest.png" alt="" />
          <img src="/images/insta.png" alt="" />
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.footerBottom}>
        <span> {t('copy_right')} </span>
      </div>
    </footer>
  );
};

export default Footer;
