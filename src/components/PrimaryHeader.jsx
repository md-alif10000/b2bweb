import styles from "../../styles/components/PrimaryHeader.module.css";
import Image from "next/image";
import Link from "next/link";
const PrimaryHeader = () => {
  return (
    <div className={styles.header} id="header">
      <div className={styles.logo}>
        <Link href="/" passHref>
          <img src={"/images/logo_white.png"} width={200} height={80} />
        </Link>
      </div>

      <div>
        <Link href={"/manufacturer"} passHref>
          <a href="/manufacturer">Manufacturer</a>
        </Link>

        <Link href={"/importer"} passHref>
          <a href="/importer">Importer</a>
        </Link>

        <button className={styles.button}>Login</button>
      </div>
    </div>
  );
};

export default PrimaryHeader;
