import React from "react";
import Footer from "../src/components/Footer";
import PrimaryHeader from "../src/components/PrimaryHeader";
import { Input } from "../src/components/ui/ui";
import styles from "../styles/Manufacturer.module.css";

const Manufacturer = () => {
  return (
    <>
      <PrimaryHeader />

      <div className={styles.container}>
        <div className={styles.hero}>
          <div>
            <h1>Fast Forward your Exportation Journey with</h1>
          </div>
          <div>
            <img src="/images/imponexpo.png" alt="" />
            <img className={styles.arrow} src="/images/arrow.png" alt="" />
          </div>
        </div>

        <div className={styles.formContainer}>
          <div></div>
          <div className={styles.form}>
            <form action="">
              <div className={styles.formHeading}>
                <h1>
                  Register as a <br />{" "}
                  <span>Brand, Manufacturer or Supplier</span>{" "}
                </h1>
                <img src="/images/line.png" alt="" />
                <p>
                  Enter your credentials to get started on the amazing journey
                </p>
              </div>
              <div className={styles.formBody}>
                <div className={styles.inputsHeading}>
                  <h2>
                    Tell us about the Business Manager (s) or Owner(s){" "}
                  </h2>{" "}
                </div>
                <div className={styles.inputsBody}>
                <div className={styles.inputGroup}>
                  <Input width={"40%"} />
                  <Input width={"40%"} />
                </div>

                </div>
               
              </div>

              <Input />
              <Input />
              <Input />
              <Input />
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Manufacturer;
