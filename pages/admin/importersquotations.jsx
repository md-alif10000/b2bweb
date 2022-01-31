import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/admin/ImportersQuotations.module.css";
import PrimaryHeader from '../../src/components/PrimaryHeader'
import  { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Importersquotations = () => {
  const [data, setdata] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const router=useRouter();

  const getQuotations = async () => {
    const res = await axios.get("/api/importerquotation");
    const data = res.data;
    console.log(data);
    setdata(data.importerQuotations);
  };

  useEffect(() => {
    getQuotations();

    if (!user) {
      return router.push("/admin/login");
    }
  
    if (user.role != "admin") {
     return router.push("/admin/login");
    }
  }, []);



 


  return (
    <>
    <PrimaryHeader/>
    <div>
      {data?.map(({ productInfo, userInfo, shippingInfo },index) => (
        <div className={styles.quotation} key={index} >
          <div>
            <h2>Product Info</h2>
            <div className={styles.item}>
              <span>Product Name</span> <span>{productInfo.productName}</span>{" "}
            </div>
            <div className={styles.item}>
              <span> Category</span> <span>{productInfo.productCategory}</span>{" "}
            </div>
            <div className={styles.item}>
              <span>Sourcing Type </span>{" "}
              <span>{productInfo.sourcingType}</span>{" "}
            </div>
            <div className={styles.item}>
              <span> Product Details </span>{" "}
              <span>{productInfo.productDetails}</span>{" "}
            </div>
            <div className={styles.item}>
              <span> Quantity </span> <span>{productInfo.quantity}</span>{" "}
            </div>
            <div className={styles.item}>
              <span> Max Budget </span> <span>{productInfo.budget}</span>{" "}
            </div>
            <h4>Product Image</h4>
            <div>
              <img src={productInfo.image?.url} alt="" />
            </div>
          </div>
          <div>
            <h2>Shipping Details</h2>
            <div className={styles.item}>
              <span>Shipping Method </span>{" "}
              <span>{shippingInfo.shippingMethod}</span>{" "}
            </div>{" "}
            <div className={styles.item}>
              <span> Destination </span> <span>{shippingInfo.destination}</span>{" "}
            </div>{" "}
            <div className={styles.item}>
              <span>Lead time </span> <span>{shippingInfo.leadtime}</span>{" "}
            </div>{" "}
            <div className={styles.item}>
              <span> Payment Method </span>{" "}
              <span>{shippingInfo.paymentMethod}</span>{" "}
            </div>{" "}
          </div>

          <div>
            <h2>About Importers</h2>
            <div className={styles.item}>
              <span>Fulll name</span> <span>{userInfo.fullName}</span>{" "}
            </div>{" "}
            <div className={styles.item}>
              <span> Company Name </span> <span>{userInfo.companyName}</span>{" "}
            </div>{" "}
            <div className={styles.item}>
              <span>Mobile Number </span> <span>{userInfo.mobileNumber}</span>{" "}
            </div>{" "}
            <div className={styles.item}>
              <span> Email </span> <span>{userInfo.email}</span>{" "}
            </div>
            <div className={styles.item}>
              <span> Website </span> <span>{userInfo.website}</span>{" "}
            </div>
            <div className={styles.item}>
              <span> Affiliate </span> <span>{userInfo.affiliate}</span>{" "}
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Importersquotations;
