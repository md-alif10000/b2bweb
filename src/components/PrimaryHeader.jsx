import styles from "../../styles/components/PrimaryHeader.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { BsFillGridFill, BsGlobe2 } from "react-icons/bs";
import i18next from "i18next";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const PrimaryHeader = () => {
  const [currentLang, setcurrentLang] = useState("en");
  const { user } = useSelector((state) => state.auth);
  const [isScrolled, setisScrolled] = useState(false);
  const [mobileMenu, setmobileMenu] = useState(false);
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
          <a>For Exporters</a>
        </Link>

        <Link href={"/importer"} passHref>
          <a>For Importers</a>
        </Link>
        <Link href={"/about"} passHref>
          <a>About us</a>
        </Link>
        <Link href={"/terms"} passHref>
          <a>Terms & Conditions</a>
        </Link>
        {user ? (
          <Link href={"/"} passHref>
            <a>Hi , {user.name}</a>
          </Link>
        ) : (
          <>
            <Link href={"/register"} passHref>
              <a>Register</a>
            </Link>
            <Link href={"/login"} passHref>
              <a>Login</a>
            </Link>
          </>
        )}

        <div className={styles.select}>
          <BsGlobe2 />
          <select
            value={currentLang}
            name=""
            id=""
            onChange={(e) => {
              i18next.changeLanguage(e.target.value);
              setcurrentLang(e.target.value);
            }}
          >
            {languages.map((lang, index) => (
              <option
                key={index}
                value={lang.code}
                // selected={lang.code === currentLang}
              >
                {lang.name}{" "}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.mobileMenu}>
        <span onClick={() => setmobileMenu(!mobileMenu)}>
          <BsFillGridFill size={30} />
        </span>
        {mobileMenu && (
          <div>
            <Link href={"/manufacturer"} passHref>
              <a>For Exporters</a>
            </Link>

            <Link href={"/importer"} passHref>
              <a>For Importers</a>
            </Link>
            <Link href={"/about"} passHref>
              <a>About us</a>
            </Link>
            <Link href={"/terms"} passHref>
              <a>Terms & Conditions</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimaryHeader;
