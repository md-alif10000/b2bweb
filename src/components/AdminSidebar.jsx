import Link from "next/link";
import React from "react";
import styles from "../../styles/components/AdminSidebar.module.css";
import {
  BsForward,
  BsFillGrid3X2GapFill,
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
  BsCreditCard2Back,
  BsFacebook,
} from "react-icons/bs";
import { BiCategoryAlt, BiHome } from "react-icons/bi";
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
            <BiCategoryAlt size={24} />
            <Link href="/admin/category"> Categories </Link>
          </li>

          <li>
            <BiHome size={24} />
            <Link href="/admin/edit/homepage"> Home Page </Link>
          </li>
          <li>
            <BiHome size={24} />
            <Link href="/admin/edit/terms"> Terms Page</Link>
          </li>
          <li>
            <BiHome size={24} />
            <Link href="/admin/edit/about"> About Page</Link>
          </li>
          <li>
            <BiHome size={24} />
            <Link href="/admin/facility"> Facilities</Link>
          </li>
          <li>
            <BiHome size={24} />
            <Link href="/admin/partner"> Partners</Link>
          </li>
          <li>
            <BiHome size={24} />
            <Link href="/admin/unit"> Units</Link>
          </li>
          <li>
            <BiHome size={24} />
            <Link href="/admin/term"> Trade Terms</Link>
          </li>
          <li>
            <BsCreditCard2Back size={24} />
            <Link href="/admin/payment"> Payment Methods</Link>
          </li>
          <li>
            <BsFacebook size={24} />
            <Link href="/admin/social">Social Media</Link>
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
