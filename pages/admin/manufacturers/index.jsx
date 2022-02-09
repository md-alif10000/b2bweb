import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../../styles/admin/Importers.module.css";
import PrimaryHeader from "../../../src/components/PrimaryHeader";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../src/components/AdminSidebar";
import AdminLayout from "../../../src/components/admin/AdminLayout";
import Link from "next/link";

const Importer = () => {
  const [data, setdata] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  const getQuotations = async () => {
    const res = await axios.get("/api/exporters");
    const data = res.data;
    console.log(data);
    setdata(data.manufacturers);
  };

  useEffect(() => {
    getQuotations();

    if (!user) {
      return router.push("/admin/login");
    }

    if (user.role != "admin") {
      return router.push("/admin/login");
    }
  }, [user]);

  return (
    <>
      <AdminLayout>
        <div className={styles.quotations}>
          <h1>Exporters</h1>

          {data.map((item, index) => (
            <Link href={`/admin/manufacturers/${item._id}`}  key={index} >
              <div className={styles.quotation}>
                <div className={styles.left}>{item.productInfo.name}</div>
                <div className={styles.center}>
                  <img src="/images/overview1.png" alt="" />
                  <img src="/images/overview1.png" alt="" />
                  <img src="/images/overview1.png" alt="" />
                </div>
                <div className={styles.right}>
                  <button>view details</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </AdminLayout>
    </>
  );
};

export default Importer;
