import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../../styles/admin/Admin.module.css";
import Link from "next/link";
import { BsFillBarChartLineFill } from "react-icons/bs";
import Chart from "../../src/components/admin/AdminChart";
import AdminLayout from "../../src/components/admin/AdminLayout";
import axios from "axios";
import { Loader } from "../../src/components/ui/ui";
const Admin = () => {
  const [data, setdata] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  const getData = async () => {
    const res = await axios.get("/api");

    setdata(res.data);
  };

  useEffect(() => {
    getData();

    if (!user) {
      router.push("/admin/login");
    }

    if (user.role != "admin") {
      router.push("/admin/login");
    }
  }, [user]);
  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <AdminLayout>
        <div className={styles.top}>
          <Link href="/admin/importers">
            <div className={styles.infoBox}>
              <span>
                <BsFillBarChartLineFill />
              </span>
              <div>
                <h4>{"Total Importer's Quote"}</h4>
                <p>{data.totalImportersQuotations}</p>
              </div>
            </div>
          </Link>

          <Link href={"/admin/manufacturers"}>
            <div className={styles.infoBox}>
              <span>
                <BsFillBarChartLineFill />
              </span>
              <div>
                <h4>{"Total Exporter's quote"}</h4>
                <p>{data.totalExportersQuotations}</p>
              </div>
            </div>
          </Link>

          <Link href={"/admin/category"}>
            <div className={styles.infoBox}>
              <span>
                <BsFillBarChartLineFill />
              </span>
              <div>
                <h4>Total Categories</h4>
                <p>{data.totalCategories}</p>
              </div>
            </div>
          </Link>

          <Link href={"/admin"}>
            <div className={styles.infoBox}>
              <span>
                <BsFillBarChartLineFill />
              </span>
              <div>
                <h4>Total Visits</h4>
                <p>255252352</p>
              </div>
            </div>
          </Link>
        </div>

        <div className={styles.center}>
          <Chart />
        </div>
      </AdminLayout>
    </>
  );
};

export default Admin;
