import React from "react";
import { ToastContainer } from "react-toastify";
import AdminSidebar from "../AdminSidebar";
import AdminHeader from "./AdminHeader";
const AdminLayout = ({ children }) => {
  const style = {
    display: "flex",
    width: "100vw",
    paddingTop: "50px",
  };
  return (
    <>
    <ToastContainer/>
      <AdminSidebar />
      <AdminHeader />
      <div style={style}>
        <div style={{ width: "250px" }}></div>
        <div
          style={{
            flexGrow: "1",
            maxWidth: "100%",
            padding: "30px",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
