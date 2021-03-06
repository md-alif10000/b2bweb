import { useState, useEffect } from "react";
import Footer from "../src/components/Footer";
import PrimaryHeader from "../src/components/PrimaryHeader";
import { CategorySelect, FloatingButton, Input } from "../src/components/ui/ui";
import styles from "../styles/Manufacturer.module.css";
import { BsCloudArrowUp } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { manufacturerValidate } from "../utils/manufacturerValidate";

import axios from "axios";
import Link from "next/link";

const Manufacturer = () => {
  const [files, setfiles] = useState([]);
  const [categories, setcategories] = useState([]);
  const ownersInfo=[];

  const [productInfo, setproductInfo] = useState({
    name: "",
    category: "",
    industry: "",
    identification: "",
    description: "",
    affiliate: "",
  });
  const [businessInfo, setbusinessInfo] = useState({
    name: "",
    website: "",
    phoneNumber: "",
    entity: "",
    country: "",
    address: "",
  });
  const [userInfo1, setuserInfo1] = useState({
    fullName: "",
    email: "",
    role: "",
  });
  const [userInfo2, setuserInfo2] = useState({
    fullName: "",
    email: "",
    role: "",
  });
  const [userInfo3, setuserInfo3] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  const addManufacturer = async (e) => {
    e.preventDefault();
    if (userInfo1.fullName) {
   ownersInfo.push(userInfo1)
    }
    if (userInfo2.fullName) {
      ownersInfo.push(userInfo2)

    }
    if (userInfo3.fullName) {
      ownersInfo.push(userInfo3)

    }

    const error = await manufacturerValidate({
      ownersInfo,
      productInfo,
      businessInfo,
    });
    if (error) {
      return toast.warn(error);
    }

    if (files.length == 0) return toast.error("Product image is required");

    try {
      const images = [];
      const uploadFile = async () => {
        for (let i = 0; i < files.length; i++) {
          const data = new FormData();
          data.append("file", files[i]);
          data.append("upload_preset", "b2bwebsite");
          const uploadedFile = await axios.post(
            "https://api.cloudinary.com/v1_1/mdalif/image/upload",
            data
          );
          console.log(uploadedFile);
          const { secure_url, public_id } = uploadedFile.data;
          console.log(secure_url);
          console.log(public_id);
          images.push({ public_id, url: secure_url });
        }
      };
      await uploadFile();

      console.log("Images", images);
      if (images.length == 0) return toast.warn("Product Image is required 2");

      productInfo.images = images;
      console.log(ownersInfo,productInfo,businessInfo)

      const res = await axios.post("/api/exporters", {
        productInfo,
        businessInfo,
        ownersInfo,
      });
      if (res.status == 201) {
        toast.success("Your credentials  submitted");
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
      <PrimaryHeader />
      <ToastContainer />

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
                      onChange={(e) =>
                        setuserInfo1({ ...userInfo1, fullName: e.target.value })
                      }
                    />
                    <Input
                      width={"40%"}
                      label={"Email"}
                      placeholder={"example@gmail.com"}
                      onChange={(e) =>
                        setuserInfo1({ ...userInfo1, email: e.target.value })
                      }
                    />
                    <Input
                      width={"40%"}
                      placeholder="Role in the company"
                      label={"Role in the company"}
                      onChange={(e) =>
                        setuserInfo1({ ...userInfo1, role: e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <Input
                      width={"40%"}
                      label={"Ful Name"}
                      placeholder={"full name"}
                      onChange={(e) =>
                        setuserInfo2({ ...userInfo2, fullName: e.target.value })
                      }
                    />
                    <Input
                      width={"40%"}
                      label={"Email"}
                      placeholder={"example@gmail.com"}
                      onChange={(e) =>
                        setuserInfo2({ ...userInfo2, email: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Role in the company"
                      width={"40%"}
                      label={"Role in the company"}
                      onChange={(e) =>
                        setuserInfo2({ ...userInfo2, role: e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <Input
                      width={"40%"}
                      label={"Ful Name"}
                      placeholder={"full name"}
                      onChange={(e) =>
                        setuserInfo3({ ...userInfo3, fullName: e.target.value })
                      }
                    />
                    <Input
                      width={"40%"}
                      label={"Email"}
                      placeholder={"example@gmail.com"}
                      onChange={(e) =>
                        setuserInfo3({ ...userInfo3, email: e.target.value })
                      }
                    />
                    <Input
                      width={"40%"}
                      placeholder="Role in the company"
                      label={"Role in the company"}
                      onChange={(e) =>
                        setuserInfo3({ ...userInfo3, role: e.target.value })
                      }
                    />
                  </div>
                  <p> *Fill in 2 and 3 incase of multiple managers </p>
                </div>

                <div className={styles.inputsHeading}>
                  <h2>Tell us about the Business </h2>{" "}
                </div>
                <div className={styles.inputsBody}>
                  <div className={styles.inputGroup}>
                    <Input
                      width={"40%"}
                      label={"Business Name"}
                      placeholder={"Business Name"}
                      onChange={(e) =>
                        setbusinessInfo({
                          ...businessInfo,
                          name: e.target.value,
                        })
                      }
                    />
                    <Input
                      width={"40%"}
                      label={"Website"}
                      placeholder={"www.example.com"}
                      onChange={(e) =>
                        setbusinessInfo({
                          ...businessInfo,
                          website: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <Input
                      width={"40%"}
                      label={"Phone Number"}
                      placeholder={"+1 255151511"}
                      onChange={(e) =>
                        setbusinessInfo({
                          ...businessInfo,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                    <Input
                      width={"40%"}
                      label={"Entity Type"}
                      placeholder={"Select your Entity Type"}
                      onChange={(e) =>
                        setbusinessInfo({
                          ...businessInfo,
                          entity: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <Input
                      width={"40%"}
                      label={"Country"}
                      placeholder={"Country name"}
                      onChange={(e) =>
                        setbusinessInfo({
                          ...businessInfo,
                          country: e.target.value,
                        })
                      }
                    />

                    <textarea
                      className={styles.textarea}
                      placeholder="Business Address"
                      onChange={(e) =>
                        setbusinessInfo({
                          ...businessInfo,
                          address: e.target.value,
                        })
                      }
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
                    onChange={(e) =>
                      setproductInfo({
                        ...productInfo,
                        name: e.target.value,
                      })
                    }
                  />

                  <div className={styles.inputGroup}>
                    <CategorySelect
                      options={categories}
                      label={"Product Category"}
                      placeholder={"Product Category"}
                      onChange={(e) =>
                        setproductInfo({
                          ...productInfo,
                          category: e.target.value,
                        })
                      }
                    />
                    <Input
                      width={"40%"}
                      label={"Product Industry"}
                      placeholder={"Product Industry"}
                      onChange={(e) =>
                        setproductInfo({
                          ...productInfo,
                          industry: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <Input
                      width={"40%"}
                      label={"Product Identification"}
                      placeholder={"Product Identification"}
                      onChange={(e) =>
                        setproductInfo({
                          ...productInfo,
                          identification: e.target.value,
                        })
                      }
                    />
                    <Input
                      width={"40%"}
                      label={"Product Persona"}
                      placeholder={"Product Persona"}
                      onChange={(e) =>
                        setproductInfo({
                          ...productInfo,
                          persona: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <textarea
                      className={styles.textarea}
                      placeholder="Enter Product Description"
                      onChange={(e) =>
                        setproductInfo({
                          ...productInfo,
                          description: e.target.value,
                        })
                      }
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
                    <input
                      type={"file"}
                      id="productPicture"
                      onChange={(e) => setfiles([...files, e.target.files[0]])}
                    />
                  </div>

                  <h2 style={{ color: "white" }}>
                    Where you refered by our Affiliate Partner?
                  </h2>

                  <Input
                    placeholder={"If yes, Enter there Name"}
                    onChange={(e) =>
                      setproductInfo({
                        ...productInfo,
                        affiliate: e.target.value,
                      })
                    }
                  />
                  <div className={styles.checkbox}>
                    <input type={"checkbox"} id="check1" />
                    <label htmlFor="check1">
                      I agree to all the{" "}
                      <Link href={"/terms"}>
                        Terms and Conditions & Policies
                      </Link>
                    </label>
                  </div>

                  <div className={styles.checkbox}>
                    <input type={"checkbox"} id="check2" />
                    <label htmlFor="check2">
                      Yes, I want to subscribe to new updates
                    </label>
                  </div>

                  <div className={styles.inputGroup}>
                    <button
                      className={styles.submitButton}
                      onClick={addManufacturer}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingButton />
    </>
  );
};

export default Manufacturer;
