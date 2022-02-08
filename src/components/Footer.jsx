import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../styles/components/Footer.module.css";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div>
            <h2>About US</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit
              aliquam autem dolorem quae est, vero architecto optio dicta
              tempore vel, vitae accusantium ad deleniti quibusdam totam
              voluptate modi mollitia fuga perspiciatis quaerat dolores facere
              qui nam. Eveniet perspiciatis consequuntur voluptatibus.{" "}
              <Link href={"/"}>
                <a>Read more..</a>
              </Link>
            </p>
          </div>
          <div>
            <div>
              <Image src={"/images/logo.png"} width={300} height={120} />
            </div>
            <div className={styles.iconContainer}>
              <img src="/images/facebook.png" alt="" />
              <img src="/images/pintarest.png" alt="" />
              <img src="/images/insta.png" alt="" />
            </div>
          </div>
        </div>

        <hr className={styles.hr} />
        <div className={styles.footerBottom}>
          <span> {t("copy_right")} </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
