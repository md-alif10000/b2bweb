import styles from "../../styles/components/PrimaryHeader.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
const PrimaryHeader = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className={styles.header} id="header">
      <div className={styles.logo}>
        <Link href="/" passHref>
          <img src={"/images/logo_white.png"} width={200} height={80} />
        </Link>
      </div>

      <div>
        <Link href={"/manufacturer"} passHref>
          <a>Manufacturer</a>
        </Link>

        <Link href={"/importer"} passHref>
          <a>Importer</a>
        </Link>

        {
          user ?  <button className={styles.button}>Logout</button>:<button className={styles.button}>Login</button>
        }

        
       
      </div>
    </div>
  );
};

export default PrimaryHeader;
