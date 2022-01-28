import styles from "../../styles/components/PrimaryHeader.module.css";
import Image from 'next/image'
const PrimaryHeader = () => {
  return <div  className={styles.header} >
      <div className={styles.logo} >

        <Image src={"/images/logo_white.png"} width={220} height={70}  />

      </div>

      <div>
          <button className={styles.button} >Login</button>
      </div>


  </div>;
};

export default PrimaryHeader;
