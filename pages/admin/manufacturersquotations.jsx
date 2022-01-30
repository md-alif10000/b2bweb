import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/admin/ImportersQuotations.module.css";
import PrimaryHeader from "../../src/components/PrimaryHeader";
import { toast, ToastContainer } from "react-toastify";

const ManufacturersQuotations = () => {
  const [data, setdata] = useState([]);

  const getQuotations = async () => {
    const res = await axios.get("/api/manufacturer");
    const data = res.data;
    console.log(data);
    setdata(data.manufacturers);
  };

  useEffect(() => {
    getQuotations();
  }, []);

  const deleteItem = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete("/api/manufacturer", { _id: id });
      if (res.status == 200) {
        toast.success("Successfully deleted");
        setdata(data.filter((itemId) => itemId != id));
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <PrimaryHeader />
      <ToastContainer />
      <div>
        {data?.map(
          (
            { _id, fullName, email, role, productInfo, businessInfo },
            index
          ) => (
            <div className={styles.quotation} key={index}>
              <span className={styles.delete} onClick={() => deleteItem(_id)}>
                {" "}
                de
              </span>
              <div>
                <h2>Product Info</h2>
                <div className={styles.item}>
                  <span>Full Name</span> <span>{fullName}</span>
                </div>
                <div className={styles.item}>
                  <span> Email</span> <span>{email}</span>
                </div>
                <div className={styles.item}>
                  <span>Role in the company </span>
                  <span>{role}</span>
                </div>
              </div>
              <div>
                <h2>Shipping Details</h2>
                <div className={styles.item}>
                  <span>Company Name </span>
                  <span>{businessInfo.name}</span>
                </div>
                <div className={styles.item}>
                  <span> Company Website </span>{" "}
                  <span>{businessInfo.website}</span>
                </div>
                <div className={styles.item}>
                  <span>Phone Number </span>{" "}
                  <span>{businessInfo.phoneNumber}</span>
                </div>
                <div className={styles.item}>
                  <span> Entity </span>
                  <span>{businessInfo.entity}</span>
                </div>
                <div className={styles.item}>
                  <span> Country </span>
                  <span>{businessInfo.country}</span>
                </div>
                <div className={styles.item}>
                  <span> Address </span>
                  <span>{businessInfo.address}</span>
                </div>
              </div>

              <div>
                <h2>About Product</h2>
                <div className={styles.item}>
                  <span>Product name</span> <span>{productInfo.name}</span>
                </div>
                <div className={styles.item}>
                  <span> Company Name </span>{" "}
                  <span>{productInfo.category}</span>
                </div>
                <div className={styles.item}>
                  <span>Mobile Number </span>{" "}
                  <span>{productInfo.industry}</span>
                </div>{" "}
                <div className={styles.item}>
                  <span> Email </span> <span>{productInfo.identification}</span>{" "}
                </div>
                <div className={styles.item}>
                  <span> Website </span> <span>{productInfo.description}</span>{" "}
                </div>
                <div className={styles.item}>
                  <span> Affiliate </span> <span>{productInfo.persona}</span>{" "}
                </div>
                <div className={styles.item}>
                  <span> Affiliate </span> <span>{productInfo.affiliate}</span>{" "}
                </div>
                <h2>Product Images</h2>
                <div className={styles.imagesContainer}>
                  {productInfo.images.map((index) => (
                    <img src={index["url"]} alt="" key={index} />
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ManufacturersQuotations;
