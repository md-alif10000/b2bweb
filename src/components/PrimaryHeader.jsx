import styles from "../../styles/components/PrimaryHeader.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { BsGlobe2 } from "react-icons/bs";
import "flag-icons/css/flag-icons.min.css";
import i18next from "i18next";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const PrimaryHeader = () => {
  const [currentLang, setcurrentLang] = useState("en");
  const [isScrolled, setisScrolled] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const languages = [
    {
      code: "en",
      name: "English",
      country_code: "us",
      flag: "&#127482 &#127480",
    },
    { code: "cn", name: "中国人", country_code: "cn", flag: "" },
  ];
  useEffect(() => {
    setcurrentLang(Cookies.get("i18next"));
    setisScrolled(window.isScrolled);
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setisScrolled(true);
      } else {
        setisScrolled(false);
      }
    });
  }, []);

  console.log(isScrolled);
  return (
    <div
      className={styles.header}
      id="header"
      style={
        isScrolled ? { position: "fixed", top: "0" } : { position: "sticky" }
      }
    >
      <div className={styles.logo}>
        <Link href="/" passHref>
          <img src={"/images/logo_white.png"} />
        </Link>
      </div>

      <div>
        <Link href={"/manufacturer"} passHref>
          <a>Exporters</a>
        </Link>

        <Link href={"/importer"} passHref>
          <a>Importer</a>
        </Link>

        <div className={styles.select}>
          <BsGlobe2 />
          <select
            name=""
            id=""
            onChange={(e) => i18next.changeLanguage(e.target.value)}
          >
            {languages.map((lang, index) => (
              <option
                key={index}
                value={lang.code}
                selected={lang.code === currentLang}
              >
                {lang.name}{" "}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PrimaryHeader;
