import axios from "axios";
import { useState, useEffect } from "react";
import { BsArchive, BsFile } from "react-icons/bs";
import { toast } from "react-toastify";
import AdminLayout from "../../../src/components/admin/AdminLayout";
import styles from "../../../styles/admin/Facility.module.css";
import { Input, Loader } from ".././../../src/components/ui/ui";

const PaymentMethods = () => {
  const [loading, setloading] = useState(false);

  const [PaymentMethodName, setPaymentMethodName] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);

  const addPaymentMethod = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/paymentmethod", {
        name: PaymentMethodName,
      });
      if (res.status == 201) {
        toast.success("Successfully added ");
        setloading(false);

        getPaymentMethods();
      }
    } catch (error) {
      setloading(false);

      toast.error("Something went wrong");
    }
  };

  const getPaymentMethods = async () => {
    setloading(true);
    const res = await axios.get("/api/paymentmethod");
    if (res.status == 200) {
      setPaymentMethods(res.data.paymentmethods);
    }

    setloading(false);
  };

  const deletePaymentMethod = async (id) => {
    try {
      const res = await axios.delete(`/api/paymentmethod/${id}`);
      setPaymentMethods(paymentMethods.filter((item) => item._id !== id));
      toast.success("Successfully deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div className={styles.wrapper}>
        <h1>Payment Methods</h1>
        <div className={styles.addItem}>
          <Input
            label={"Name"}
            onChange={(e) => setPaymentMethodName(e.target.value)}
            value={PaymentMethodName}
          />

          <button className={styles.button} onClick={addPaymentMethod}>
            Add Payment Method
          </button>
        </div>
        <div className={styles.items}>
          {paymentMethods.map((item, index) => (
            <div className={styles.item} key={index}>
              <p>{item.name}</p>

              <div>
                <span onClick={() => deletePaymentMethod(item._id)}>
                  <BsArchive />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentMethods;
