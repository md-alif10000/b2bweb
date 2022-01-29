import React from "react";
import { Input } from "../../src/components/ui/ui";
import styles from "../../styles/admin/Login.module.css";

const login = () => {
  return (
    <div className={styles.loginForm}>
        <h2>Login</h2>
      <form action="">
        <Input  label="email" />
        <Input label="password" />
        <div><button className={styles.submitButton} >Login</button></div>
      </form>
    </div>
  );
};

export default login;
