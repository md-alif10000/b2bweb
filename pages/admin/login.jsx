import {useRouter} from "next/router";
import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { login } from "../../src/components/redux/actions/authAction";
import { Input } from "../../src/components/ui/ui";
import styles from "../../styles/admin/Login.module.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const router=useRouter()

  const {user}=useSelector(state=>state.auth);

  const dispatch = useDispatch();

  const loginUser = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  useEffect(() => {

    if(user && user.role=="admin"){
      return router.push("/admin")
    }
    
    
  }, [user]);

  return (
    <div className={styles.loginForm}>
      <ToastContainer/>
      <h2>Login</h2>
      <form action="">
        <Input label="email"  onChange={(e)=>setemail(e.target.value)} />
        <Input label="password" onChange={(e)=>setpassword(e.target.value)}/>
        <div>
          <button className={styles.submitButton} onClick={loginUser}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
