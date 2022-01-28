import PrimaryHeader from "../src/components/PrimaryHeader";
import styles from "../styles/Buyer.module.css";
import { Input } from "../src/components/ui/ui";
import Footer from "../src/components/Footer";
const Buyer = () => {
  return (
    <>
      <div className={styles.container}>
        <PrimaryHeader />

        <img className={styles.image1} src="images/dotted.png" alt="" />
        <img className={styles.image2} src="images/rectangle1.png" alt="" />
        <img className={styles.image3} src="images/rectangle2.png" alt="" />

        <div>
          <div className={styles.hero}>
            <h1>
              Tell us about your <span>Requirement</span>
            </h1>
            <p>Enter the details to get the best quality goods !</p>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.left}></div>
            <div className={styles.right}>
              <form action="" className={styles.form}>
                <div className={styles.inputs}>
                  <Input />
                  <Input />
                  <Input />
                  <Input />
                  <Input />
                  <Input />
                </div>

                <div className={styles.checkboxContainer}>
                  <input type="checkbox" />
                  <span>
                    I agree to all the{" "}
                    <a href="">Terms and Conditions & Policies</a>
                  </span>{" "}
                  <br />
                  <input type="checkbox" />
                  <span>
                    I agree to all the{" "}
                    <a href="">Terms and Conditions & Policies</a>
                  </span>{" "}
                  <br />
                </div>
                <button className={styles.submitButton}>
                  Post Buy Requirement
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Buyer;
