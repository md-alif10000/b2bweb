import PrimaryHeader from "../src/components/PrimaryHeader";
import { Input } from "../src/components/ui/ui";
import styles from "../styles/Importer.module.css";
import {  BsCheckCircleFill } from "react-icons/bs";
import Footer from "../src/components/Footer";

const Importer = () => {
  return (
    <>
      <PrimaryHeader />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1>Request for Quotations- RFQ</h1>
          <img src="/images/line.png" alt="" />
        </div>
        <div className={styles.main}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h3>Basic Product Information</h3>
            </div>
            <div className={styles.inputGroup}>
              <Input placeholder="Product Name" />
              <Input placeholder="Product Category" />
              <Input placeholder="Sourcing Type" />
              <Input placeholder="Product Name" />
            </div>
            <div className={styles.formHeader}>
              <h3>Shipping and Payment</h3>
            </div>
            <div className={styles.inputGroup}>
              <Input placeholder="Shipping Method" />
              <Input placeholder="Destination" />
              <Input placeholder="Lead Time " />
              <Input placeholder="Payment Method" />
            </div>
            <div className={styles.formHeader}>
              {/* <h3>Basic Product Information</h3> */}
            </div>
            <div className={styles.inputGroup}>
              <Input placeholder="Payment Method" />
              <Input placeholder="Company Name (if any)" />
              <Input placeholder="*Mobile Number" width={"50%"} />
              <Input placeholder="**Email " width={"50%"} />
              <h4>Where you refered by our Affiliate Partner?</h4>
              <Input placeholder="If yes, Enter there Name" />
            </div>

            <div className={styles.checkboxContainer}>
              <div>
                <input type="checkbox" id="check1" />
                <label htmlFor="check1">
                  I agree to all the Terms and Conditions & Policies
                </label>
              </div>
              <div>
                <input type="checkbox" id="check2" />
                <label htmlFor="check2">
                  Yes, I want to subscribe to new updates
                </label>
              </div>
              <div>
                <input type="checkbox" id="check3" />
                <label htmlFor="check3">
                  I agree to share my Business Card with our Trusted, Reliable
                  and Certified Suppliers
                </label>
              </div>
            </div>
            <div className={styles.buttonContainer} >
              <button className={styles.submitButton}>
                Post Buy Requirement
              </button>
            </div>
          </div>
          <div className={styles.rfq}>
            <h1>RFQ Score</h1>
            <p>
              Provide as much details as possible about your request to ensure
              faster response from the right suppliers. The higher the score the
              better responses you will get.
            </p>
            <div className={styles.checks}>
              <div>
                <BsCheckCircleFill /> <span>Product Name</span>
              </div>
              <div>
                <BsCheckCircleFill /> <span>Product Category</span>
              </div>
              <div>
                <BsCheckCircleFill /> <span>About Your Product</span>
              </div>
              <div>
                <BsCheckCircleFill /> <span>Sourcing Type </span>
              </div>
              <div>
                <BsCheckCircleFill /> <span>Upload Product</span>
              </div>
              <div>
                <BsCheckCircleFill /> <span> Shiping Method </span>
              </div>
              <div>
                <BsCheckCircleFill /> <span> Destination </span>
              </div>
              <div>
                <BsCheckCircleFill /> <span>Lead Time</span>
              </div>
              <div>
                <BsCheckCircleFill /> <span>Full Name</span>
              </div>
              <div>
                <BsCheckCircleFill /> <span>Mobile Number</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Importer;
