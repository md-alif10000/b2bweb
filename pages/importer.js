import PrimaryHeader from "../src/components/PrimaryHeader";
import { useState } from "react";
import {
  BudgetInput,
  FloatingButton,
  Input,
  QuantityInput,
} from "../src/components/ui/ui";
import styles from "../styles/Importer.module.css";
import { ToastContainer, toast } from "react-toastify";
import { BsCheckCircleFill, BsPlusCircle } from "react-icons/bs";
import Footer from "../src/components/Footer";
import axios from "axios";

const Importer = () => {
  const [productInfo, setproductInfo] = useState({
    productName: "",
    productCategory: "",
    sourcingType: "",
    productDetails: "",
    quantity: "",
    budget: "",
    tradeTerms: "",
  });
  const [shippingInfo, setshippingInfo] = useState({
    shippingMethod: "",
    destination: "",
    leadtime: "",
    paymentMethod: "",
  });
  const [userInfo, setuserInfo] = useState({
    fullName: "",
    companyName: "",
    mobileNumber: "",
    email: "",
    website: "",
    affiliate: "",
  });

  const addQuotation = async () => {
    try {
      const res = await axios.post("/api/importerquotation", {
        productInfo,
        shippingInfo,
        userInfo,
      });
      if (res.status == 201) {
        toast.success("Successfully submitted your quotation");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <ToastContainer/>
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
              <Input
                placeholder="Product Name"
                onChange={(e) =>
                  setproductInfo({
                    ...productInfo,
                    productName: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Product Category"
                onChange={(e) =>
                  setproductInfo({
                    ...productInfo,
                    productCategory: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Sourcing Type"
                onChange={(e) =>
                  setproductInfo({
                    ...productInfo,
                    sourcingType: e.target.value,
                  })
                }
              />

              <div className={styles.multiInput}>
                <textarea
                  placeholder="About the product"
                  onChange={(e) =>
                    setproductInfo({
                      ...productInfo,
                      productDetails: e.target.value,
                    })
                  }
                ></textarea>
                <div className={styles.productImagePicker}>
                  <label htmlFor="productImage">
                    <div>
                      <BsPlusCircle size="30" /> <span>Upload Image </span>{" "}
                    </div>{" "}
                  </label>
                  <input type={"file"} id="productImage" />
                </div>
              </div>

              <div className={styles.multiInput}>
                <QuantityInput
                  placeholder="Enter quantity"
                  onChange={(e) =>
                    setproductInfo({
                      ...productInfo,
                      quantity: e.target.value,
                    })
                  }
                />
                <BudgetInput
                  placeholder="Max Budget"
                  onChange={(e) =>
                    setproductInfo({
                      ...productInfo,
                      budget: e.target.value,
                    })
                  }
                />
              </div>
              <Input
                placeholder="Trade Terms"
                onChange={(e) =>
                  setproductInfo({
                    ...productInfo,
                    tradeTerms: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formHeader}>
              <h3>Shipping and Payment</h3>
            </div>
            <div className={styles.inputGroup}>
              <Input
                placeholder="Shipping Method"
                onChange={(e) =>
                  setshippingInfo({
                    ...shippingInfo,
                    shippingMethod: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Destination"
                onChange={(e) =>
                  setshippingInfo({
                    ...shippingInfo,
                    destination: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Lead Time "
                onChange={(e) =>
                  setshippingInfo({
                    ...shippingInfo,
                    leadtime: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Payment Method"
                onChange={(e) =>
                  setshippingInfo({
                    ...shippingInfo,
                    paymentMethod: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formHeader}>
              {/* <h3>Basic Product Information</h3> */}
            </div>
            <div className={styles.inputGroup}>
              <Input
                placeholder="Full name"
                onChange={(e) =>
                  setuserInfo({
                    ...userInfo,
                    fullName: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Company Name (if any)"
                onChange={(e) =>
                  setuserInfo({
                    ...userInfo,
                    companyName: e.target.value,
                  })
                }
              />
              <div className={styles.multiInput}>
                <Input
                  placeholder="*Mobile Number"
                  width={"40%"}
                  onChange={(e) =>
                    setuserInfo({
                      ...userInfo,
                      mobileNumber: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="**Email "
                  width={"40%"}
                  onChange={(e) =>
                    setuserInfo({
                      ...userInfo,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <Input
                placeholder="Website (if any)"
                onChange={(e) =>
                  setuserInfo({
                    ...userInfo,
                    website: e.target.value,
                  })
                }
              />

              <h4>Where you refered by our Affiliate Partner?</h4>
              <Input
                placeholder="If yes, Enter there Name"
                onChange={(e) =>
                  setuserInfo({
                    ...userInfo,
                    affiliate: e.target.value,
                  })
                }
              />
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
            <div className={styles.buttonContainer}>
              <button className={styles.submitButton} onClick={addQuotation}>
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
              <p> {productInfo.productName} </p>
              <p> {productInfo.productDetails} </p>
              <p> {productInfo.productCategory} </p>
              <p> {productInfo.sourcingType} </p>
              <p> {productInfo.quantity} </p>
              <p> {productInfo.budget} </p>
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
      <Footer />
      <FloatingButton />
    </>
  );
};

export default Importer;
