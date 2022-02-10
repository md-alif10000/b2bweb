import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../src/components/redux/actions/authAction";
import { CategorySelect, Input } from "../src/components/ui/ui";
import styles from "../styles/Register.module.css";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
  });

  const loginUser = (e) => {
    e.preventDefault();

    console.log(userInfo);
    if (
      userInfo.name == "" ||
      userInfo.email == "" ||
      userInfo.role == "" ||
      userInfo.mobileNumber == "" ||
      userInfo.country == ""
    ) {
      return toast.warn("All fields are required");
    }

    dispatch(login({ ...userInfo }));
  };
  const options = [{ name: "importer" }, { name: "exporter" }];

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className={styles.container}>
      <ToastContainer />
      <form action="">
        <Input
          label={"Your email address"}
          onChange={(e) => setuserInfo({ ...userInfo, email: e.target.value })}
        />

        <Input
          label={"Password"}
          type="password"
          onChange={(e) =>
            setuserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <button className={styles.submitButton} onClick={loginUser}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
