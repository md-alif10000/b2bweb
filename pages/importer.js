import PrimaryHeader from "../src/components/PrimaryHeader";
import { useState, useEffect } from "react";
import {
  BudgetInput,
  FloatingButton,
  Input,
  QuantityInput,
  CategorySelect,
} from "../src/components/ui/ui";
import styles from "../styles/Importer.module.css";
import { ToastContainer, toast } from "react-toastify";
import { BsCheckCircleFill, BsPlusCircle } from "react-icons/bs";
import Footer from "../src/components/Footer";
import axios, { Axios } from "axios";
import { importersValidate } from "../utils/importersValidate";

const Importer = () => {
  const [categories, setcategories] = useState([]);
  const [terms, setterms] = useState(false);
  const [businessCard, setbusinessCard] = useState(false);
  const [file, setfile] = useState(null);
  const [productInfo, setproductInfo] = useState({
    productName: "",
    productCategory: "",
    sourcingType: "",
    productDetails: "",
    quantity: "",
    budget: "",
    tradeTerms: "",
    image: {},
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
    const error = await importersValidate({
      productInfo,
      shippingInfo,
      userInfo,
    });
    if (error) {
      return toast.warn(error);
    }
    if (!terms && !businessCard) {
      return toast.error("Please agree to terms and conditions");
    }
    try {
      if (!file) return toast.error("Product image is required");
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "b2bwebsite");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/mdalif/image/upload",
        data
      );
      const { secure_url, public_id } = uploadRes.data;
      productInfo.image.url = secure_url;
      productInfo.image.public_id = public_id;

      console.log(uploadRes.data);

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

  const getCategory = async () => {
    try {
      const res = await axios.get("/api/category");
      console.log(res);
      if (res.status == 200) {
        setcategories(res.data.categories);
        console.log(categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <ToastContainer />
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
                label="Product Name"
                onChange={(e) =>
                  setproductInfo({
                    ...productInfo,
                    productName: e.target.value,
                  })
                }
              />

              <CategorySelect options={categories} />
              <Input
                placeholder="Product Category"
                label="Product category"
                onChange={(e) =>
                  setproductInfo({
                    ...productInfo,
                    productCategory: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Sourcing Type"
                label="Sourcing Type"
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
                  label="Description"
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
                      <BsPlusCircle size="30" />{" "}
                      <span>Upload product Image </span>{" "}
                    </div>{" "}
                  </label>
                  <input
                    type={"file"}
                    id="productImage"
                    onChange={(e) => setfile(e.target.files[0])}
                  />
                </div>
              </div>

              <div className={styles.multiInput}>
                <QuantityInput
                  placeholder="Enter quantity"
                  label="Quantity"
                  onChange={(e) =>
                    setproductInfo({
                      ...productInfo,
                      quantity: e.target.value,
                    })
                  }
                />
                <BudgetInput
                  placeholder="Max Budget"
                  label="Max Budget"
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
                label="Trade terms"
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
                label="Shipping method"
                onChange={(e) =>
                  setshippingInfo({
                    ...shippingInfo,
                    shippingMethod: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Destination"
                label="Destination"
                onChange={(e) =>
                  setshippingInfo({
                    ...shippingInfo,
                    destination: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Lead Time "
                label="Lead time"
                onChange={(e) =>
                  setshippingInfo({
                    ...shippingInfo,
                    leadtime: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Payment Method"
                label="Payment method"
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
                label="Full name"
                onChange={(e) =>
                  setuserInfo({
                    ...userInfo,
                    fullName: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Company Name (if any)"
                label="Company name"
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
                  label="**Mobile number"
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
                  label="**Email"
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
                <input
                  type="checkbox"
                  id="check1"
                  onChange={() => setterms(true)}
                />
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
                <input
                  type="checkbox"
                  id="check3"
                  onChange={() => setbusinessCard(true)}
                />
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
              <div
                className={productInfo.productName ? styles.activeCheck : ""}
              >
                <BsCheckCircleFill /> <span>Product Name</span>
              </div>
              <div
                className={
                  productInfo.productCategory ? styles.activeCheck : ""
                }
              >
                <BsCheckCircleFill /> <span>Product Category</span>
              </div>
              <div
                className={productInfo.productDetails ? styles.activeCheck : ""}
              >
                <BsCheckCircleFill /> <span>About Your Product</span>
              </div>
              <div
                className={productInfo.sourcingType ? styles.activeCheck : ""}
              >
                <BsCheckCircleFill /> <span>Sourcing Type </span>
              </div>
              <div className={productInfo.quantity ? styles.activeCheck : ""}>
                <BsCheckCircleFill /> <span>Quantity </span>
              </div>
              <div className={productInfo.budget ? styles.activeCheck : ""}>
                <BsCheckCircleFill /> <span>Max Budget </span>
              </div>
              <div className={productInfo.tradeTerms ? styles.activeCheck : ""}>
                <BsCheckCircleFill /> <span>Trade Terms</span>
              </div>
              <div
                className={
                  shippingInfo.shippingMethod ? styles.activeCheck : ""
                }
              >
                <BsCheckCircleFill /> <span> Shiping Method </span>
              </div>
              <div
                className={shippingInfo.destination ? styles.activeCheck : ""}
              >
                <BsCheckCircleFill /> <span> Destination </span>
              </div>
              <div className={shippingInfo.leadtime ? styles.activeCheck : ""}>
                <BsCheckCircleFill /> <span>Lead Time</span>
              </div>
              <div
                className={shippingInfo.paymentMethod ? styles.activeCheck : ""}
              >
                <BsCheckCircleFill /> <span>Full Name</span>
              </div>
              <div className={userInfo.fullName ? styles.activeCheck : ""}>
                <BsCheckCircleFill /> <span>Full Name</span>
              </div>
              <div
                className={productInfo.companyName ? styles.activeCheck : ""}
              >
                <BsCheckCircleFill /> <span>Company Name</span>
              </div>
              <div className={userInfo.mobileNumber ? styles.activeCheck : ""}>
                <BsCheckCircleFill /> <span>Mobile Number</span>
              </div>
              <div className={userInfo.email ? styles.activeCheck : ""}>
                <BsCheckCircleFill /> <span>Email</span>
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
