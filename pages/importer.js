import PrimaryHeader from "../src/components/PrimaryHeader";
import { useState, useEffect } from "react";
import {
  BudgetInput,
  FloatingButton,
  Input,
  QuantityInput,
  CategorySelect,
  Loader,
} from "../src/components/ui/ui";
import styles from "../styles/Importer.module.css";
import { ToastContainer, toast } from "react-toastify";
import { BsCheckCircleFill, BsPlusCircle } from "react-icons/bs";
import Footer from "../src/components/Footer";
import axios from "axios";
import { importersValidate } from "../utils/importersValidate";
import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Importer = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { name, email, phoneNumber, description, quantity } = router.query;
  console.log(name);
  const [percentage, setpercentage] = useState(50);
  const [loading, setloading] = useState(false);
  const [isAffiliate, setisAffiliate] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [units, setunits] = useState([]);
  const [terms, setTerms] = useState([]);
  const [categories, setcategories] = useState([]);
  const [businessCard, setbusinessCard] = useState(false);
  const [file, setfile] = useState(null);
  const [Preview, setPreview] = useState(null);
  const [productInfo, setproductInfo] = useState({
    productName: name ? name : "",
    productCategory: "",
    sourcingType: "",
    productDetails: description ? description : "",
    quantity: quantity ? quantity : "",
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
    fullName:user?.name ? user?.name: "",
    companyName: "",
    mobileNumber: phoneNumber ? phoneNumber :user?.phone ? user?.phone: "",
    email: email ? email :user?.email ? user?.email: "",
    website: "",
    affiliate: "",
  });

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

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

      const res = await axios.post("/api/importers", {
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
  const getUnits = async () => {
    setloading(true);
    const res = await axios.get("/api/unit");
    if (res.status == 200) {
      setunits(res.data.units);
    }

    setloading(false);
  };
  const getTerms = async () => {
    setloading(true);
    const res = await axios.get("/api/term");
    if (res.status == 200) {
      setTerms(res.data.terms);
    }

    setloading(false);
  };

  const getPaymentMethods = async () => {
    setloading(true);
    const res = await axios.get("/api/paymentmethod");
    if (res.status == 200) {
      setPaymentMethods(res.data.paymentmethods);
    }

    setloading(false);
  };

  const countScore = () => {
    const score =
      (productInfo.productName ? 10 : 0) +
      (productInfo.productCategory ? 5 : 0) +
      (productInfo.sourcingType ? 5 : 0) +
      (productInfo.productDetails ? 5 : 0) +
      (productInfo.quantity ? 5 : 0) +
      (productInfo.budget ? 5 : 0) +
      (productInfo.tradeTerms ? 5 : 0) +
      (shippingInfo.destination ? 5 : 0) +
      (shippingInfo.leadtime ? 5 : 0) +
      (shippingInfo.paymentMethod ? 5 : 0) +
      (shippingInfo.shippingMethod ? 5 : 0) +
      (userInfo.fullName ? 5 : 0) +
      (userInfo.companyName ? 5 : 0) +
      (userInfo.mobileNumber ? 10 : 0) +
      (userInfo.email ? 5 : 0) +
      (userInfo.website ? 5 : 0) +
      (userInfo.affiliate ? 5 : 0);
    setpercentage(score);
  };

  useEffect(() => {
    countScore();
  }, [productInfo, userInfo, shippingInfo]);

  useEffect(() => {
    getCategory();
    getUnits();
    getTerms();
    getPaymentMethods();
  }, []);

  console.log(isAffiliate);

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
                value={productInfo.productName}
                placeholder="Product Name"
                label="Product Name"
                onChange={(e) =>
                  setproductInfo({
                    ...productInfo,
                    productName: e.target.value,
                  })
                }
              />

              <CategorySelect
                value={productInfo.productCategory}
                options={categories}
                label="Product category"
                onChange={(e) =>
                  setproductInfo({
                    ...productInfo,
                    productCategory: e.target.value,
                  })
                }
              />

              <Input
                value={productInfo.sourcingType}
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
                  value={productInfo.productDetails}
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
                    {Preview ? (
                      <div>
                        {" "}
                        <img src={Preview} />{" "}
                      </div>
                    ) : (
                      <div>
                        <BsPlusCircle size="30" />
                        <span>Upload product Image </span>
                      </div>
                    )}
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
                  value={productInfo.quantity}
                  placeholder="Enter quantity"
                  label="Quantity"
                  options={units}
                  onChange={(e) =>
                    setproductInfo({
                      ...productInfo,
                      quantity: e.target.value,
                    })
                  }
                />
                <BudgetInput
                  value={productInfo.budget}
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

              <CategorySelect
                value={productInfo.tradeTerms}
                options={terms}
                label="Trade Terms"
                onChange={(e) =>
                  setproductInfo({ ...productInfo, tradeTerms: e.target.value })
                }
              >
                <option value={""}>Select Trade Terms</option>
              </CategorySelect>
            </div>
            <div className={styles.formHeader}>
              <h3>Shipping and Payment</h3>
            </div>
            <div className={styles.inputGroup}>
              <Input
                value={shippingInfo.shippingMethod}
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
                value={shippingInfo.destination}
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
                value={shippingInfo.leadtime}
                placeholder="Lead Time "
                label="Lead time"
                onChange={(e) =>
                  setshippingInfo({
                    ...shippingInfo,
                    leadtime: e.target.value,
                  })
                }
              />
              <CategorySelect
                value={shippingInfo.paymentMethod}
                label="Payment method"
                options={paymentMethods}
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
                value={userInfo.fullName}
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
                value={userInfo.companyName}
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
                  value={userInfo.mobileNumber}
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
                  value={userInfo.email}
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
                value={userInfo.website}
                placeholder="Website (if any)"
                onChange={(e) =>
                  setuserInfo({
                    ...userInfo,
                    website: e.target.value,
                  })
                }
              />

              <div className={styles.affiliate}>
                <h4>Where you refered by our Affiliate Partner?</h4>{" "}
                <select
                  defaultChecked={isAffiliate}
                  onChange={(e) => setisAffiliate(e.target.value)}
                >
                  <option value={""}>No</option>
                  <option value={"yeah"}>Yes</option>
                </select>
              </div>
              {isAffiliate && (
                <Input
                  value={userInfo.affiliate}
                  placeholder="If yes, Enter there Name"
                  onChange={(e) =>
                    setuserInfo({
                      ...userInfo,
                      affiliate: e.target.value,
                    })
                  }
                />
              )}
            </div>

            <div className={styles.checkboxContainer}>
              <div>
                <input
                  type="checkbox"
                  id="check1"
                  // onChange={() => setterms(true)}
                />
                <label htmlFor="check1">
                  I agree to all the{" "}
                  <Link href={"/terms"}>
                    <a>Terms and Conditions & Policies</a>
                  </Link>
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
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "20px",
                pathTransitionDuration: 0.75,
                pathColor: `#537fff`,
                textColor: `${percentage > 70 ? "#1be314" : "#f88"}`,
                trailColor: "#d6d6d6",
                backgroundColor: "#537fff",
              })}
            />
            ;
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
                <BsCheckCircleFill /> <span>PaymentMethod</span>
              </div>
              <div className={userInfo.fullName ? styles.activeCheck : ""}>
                <BsCheckCircleFill /> <span>Full Name</span>
              </div>
              <div className={userInfo.companyName ? styles.activeCheck : ""}>
                <BsCheckCircleFill /> <span>Company Name</span>
              </div>
              <div className={userInfo.mobileNumber ? styles.activeCheck : ""}>
                <BsCheckCircleFill /> <span>Mobile Number</span>
              </div>
              <div className={userInfo.email ? styles.activeCheck : ""}>
                <BsCheckCircleFill /> <span>Email</span>
              </div>
              <div className={userInfo.website ? styles.activeCheck : ""}>
                <BsCheckCircleFill /> <span>Website</span>
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
