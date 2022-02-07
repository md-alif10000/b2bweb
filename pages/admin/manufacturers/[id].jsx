import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../../styles/admin/ImportersQuotations.module.css";
import PrimaryHeader from "../../../src/components/PrimaryHeader";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../src/components/AdminSidebar";
import AdminLayout from "../../../src/components/admin/AdminLayout";

const ManufacturersQuotations = () => {
  const [data, setdata] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const {id}=router.query

  // let productInfo =data && data.productInfo;
  // let shippingInfo =data && data.businessInfo;
  // let userInfo =data && data.userInfo;
  const {productInfo,businessInfo,fullName,_id,email,role}=data ? data:{}

  const getQuotation = async () => {
    const res = await axios.get(`/api/exporters/${id}`);
    const data = res.data;
    console.log(data);
    setdata(data.manufacturer);
  };

  useEffect(() => {
    getQuotation();
  }, [id]);

  const deleteItem = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`/api/exporters/${id}`);
      console.log(res);
      if (res.status == 200) {
        toast.success("Successfully deleted");
        setdata(data.filter((item) => item._id != id));

        
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!user) {
      return router.push("/admin/login");
    }

    if (user.role != "admin") {
      router.push("/admin/login");
    }
  }, [user]);

  return (
    <>
      <AdminLayout>
        <div className={styles.container}>
          <AdminSidebar />
          <div className={styles.quotations}>
            <div>
             
                  {data && <div className={styles.quotation} >
                    <span
                      className={styles.delete}
                      onClick={() => deleteItem(_id)}
                    >
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
                        <span>Product name</span>{" "}
                        <span>{productInfo.name}</span>
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
                        <span> Email </span>{" "}
                        <span>{productInfo.identification}</span>{" "}
                      </div>
                      <div className={styles.item}>
                        <span> Website </span>{" "}
                        <span>{productInfo.description}</span>
                      </div>
                      <div className={styles.item}>
                        <span> Affiliate </span>{" "}
                        <span>{productInfo.persona}</span>{" "}
                      </div>
                      <div className={styles.item}>
                        <span> Affiliate </span>{" "}
                        <span>{productInfo.affiliate}</span>{" "}
                      </div>
                      <h2>Product Images</h2>
                      <div className={styles.imagesContainer}>
                        {productInfo.images.map((index) => (
                          <img src={index["url"]} alt="" key={index} />
                        ))}
                      </div>
                    </div>
                  </div>}
             
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default ManufacturersQuotations;
