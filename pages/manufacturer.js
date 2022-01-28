import React from "react";
import Footer from "../src/components/Footer";
import PrimaryHeader from "../src/components/PrimaryHeader";
import { FloatingButton, Input } from "../src/components/ui/ui";
import styles from "../styles/Manufacturer.module.css";
import { BsCloudArrowUp } from "react-icons/bs";

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
                  <h2>Tell us about the Business Manager (s) or Owner(s) </h2>{" "}
                </div>
                <div className={styles.inputsBody}>
                  <div className={styles.inputGroup}>
                    <Input
                      width={"40%"}
                      label={"Ful Name"}
                      placeholder={"full name"}
                    />
                    <Input
                      width={"40%"}
                      label={"Email"}
                      placeholder={"example@gmail.com"}
                    />
                    <Input width={"40%"} label={"Role in the company"} />
                  </div>
                </div>

                <div className={styles.inputsHeading}>
                  <h2>Tell us about the Business Manager (s) or Owner(s) </h2>{" "}
                </div>
                <div className={styles.inputsBody}>
                  <div className={styles.inputGroup}>
                    <Input
                      width={"40%"}
                      label={"Business Name"}
                      placeholder={"Business Name"}
                    />
                    <Input
                      width={"40%"}
                      label={"Website"}
                      placeholder={"www.example.com"}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <Input
                      width={"40%"}
                      label={"Phone Number"}
                      placeholder={"+1 255151511"}
                    />
                    <Input
                      width={"40%"}
                      label={"Entity Type"}
                      placeholder={"Select your Entity Type"}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <Input
                      width={"40%"}
                      label={"Country"}
                      placeholder={"Country name"}
                    />

                    <textarea
                      className={styles.textarea}
                      placeholder="Business Address"
                    ></textarea>
                  </div>
                </div>

                <div className={styles.inputsHeading}>
                  <h2>Tell us about the Product </h2>{" "}
                </div>

                <div className={styles.inputsBody}>
                  <Input
                    label={"Product Name"}
                    placeholder={"Kindly Enter the Product Name "}
                  />

                  <div className={styles.inputGroup}>
                    <Input
                      width={"40%"}
                      label={"Product Category"}
                      placeholder={"Product Category"}
                    />
                    <Input
                      width={"40%"}
                      label={"Product Industry"}
                      placeholder={"Product Industry"}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <Input
                      width={"40%"}
                      label={"Product Identification"}
                      placeholder={"Product Identification"}
                    />
                    <Input
                      width={"40%"}
                      label={"Product Persona"}
                      placeholder={"Product Persona"}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <textarea
                      className={styles.textarea}
                      placeholder="Enter Product Description"
                    ></textarea>
                  </div>

                  <div className={styles.fileUpload}>
                    <label htmlFor="productPicture">
                      <span className={styles.fileUploadBtn}>
                        Upload{" "}
                        <BsCloudArrowUp
                          size={30}
                          style={{ margin: "5px 10px" }}
                        />{" "}
                      </span>{" "}
                    </label>
                    <input type={"file"} id="productPicture" />
                  </div>

                  <h2 style={{color:"white"}} >Where you refered by our Affiliate Partner?</h2>

                  <Input placeholder={"If yes, Enter there Name"} />
                  <div className={styles.checkbox}>
                    <input type={"checkbox"} id="check1" />
                    <label htmlFor="check1">
                      I agree to all the <a>Terms and Conditions & Policies</a>
                    </label>
                  </div>

                  <div className={styles.checkbox}>
                    <input type={"checkbox"} id="check2" />
                    <label htmlFor="check2">
                      Yes, I want to subscribe to new updates
                    </label>
                  </div>

                  <div className={styles.inputGroup} >
                    <button className={styles.submitButton} >Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingButton/>
    </>
  );
};

export default Manufacturer;
