import Link from "next/link";
import React from "react";
import styles from "../../styles/components/AdminSidebar.module.css";
import {
  BsForward,
  BsFillGrid3X2GapFill,
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logout } from "./redux/actions/authAction";

const AdminSidebar = () => {
  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.sidebar}>
      <h2>ImpoNexpo </h2>
      <div>
        <ul>
          <li>
            <BsFillGrid3X2GapFill size={24} />
            <Link href="/admin"> Dashboard </Link>{" "}
          </li>

          <li>
            <BsFillArrowDownCircleFill size={24} />
            <Link href="/admin/importers"> Importers </Link>{" "}
          </li>
          <li>
            <BsFillArrowUpCircleFill size={24} />
            <Link href="/admin/manufacturers"> Exporters </Link>{" "}
          </li>
          <li>
            <BsFillArrowUpCircleFill size={24} />
            <Link href="/admin/category"> Categories </Link>
          </li>
        
          <li>
            <BsFillArrowUpCircleFill size={24} />
            <Link href="/admin/edit/homepage"> Home Page </Link>
          </li>
        </ul>
        <div className={styles.logout}>
          <span onClick={userLogout}>Logout</span>
          <BsForward size={28} />{" "}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
