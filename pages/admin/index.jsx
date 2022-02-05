import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../../styles/admin/Admin.module.css";
import PrimaryHeader from "../../src/components/PrimaryHeader";
import Link from "next/link";
import AdminSidebar from "../../src/components/AdminSidebar";
import AdminHeader from "../../src/components/admin/AdminHeader";
import { BsFillBarChartLineFill } from "react-icons/bs";
import Chart from "../../src/components/admin/AdminChart";
import AdminLayout from "../../src/components/admin/AdminLayout";
const Admin = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/admin/login");
    }

    if (user.role != "admin") {
      router.push("/admin/login");
    }
  }, []);

  return (
    <>
      
    <AdminLayout>
    <div className={styles.top}>
          <div className={styles.infoBox}>
            <span>
              <BsFillBarChartLineFill />
            </span>
            <div>
              <h4>Total Visits</h4>
              <p>255252352</p>
            </div>
          </div>
          <div className={styles.infoBox}>
            <span>
              <BsFillBarChartLineFill />
            </span>
            <div>
              <h4>Total Visits</h4>
              <p>255252352</p>
            </div>
          </div>
          <div className={styles.infoBox}>
            <span>
              <BsFillBarChartLineFill />
            </span>
            <div>
              <h4>Total Visits</h4>
              <p>255252352</p>
            </div>
          </div>
          <div className={styles.infoBox}>
            <span>
              <BsFillBarChartLineFill />
            </span>
            <div>
              <h4>Total Visits</h4>
              <p>255252352</p>
            </div>
          </div>
        </div>

        <div className={styles.center}>
          <Chart />
        </div>
    </AdminLayout>
    </>
  );
};

export default Admin;
