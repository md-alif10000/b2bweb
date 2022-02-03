import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../../styles/admin/Admin.module.css";
import PrimaryHeader from "../../src/components/PrimaryHeader";
import Link from "next/link";
import AdminSidebar from "../../src/components/AdminSidebar";

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
      <PrimaryHeader />
      <div className={styles.container}>
        <AdminSidebar/>
        <Link href="/admin/importersquotations">
          <button>Importers</button>
        </Link>

        <Link href="/admin/manufacturersquotations">
          <button>Manufacturers</button>
        </Link>
      </div>
    </>
  );
};

export default Admin;
