import { useRouter } from "next/router";
import { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../src/components/redux/actions/authAction";
import { CategorySelect, Input } from "../src/components/ui/ui";
import styles from "../styles/Register.module.css";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [userInfo, setuserInfo] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = (e) => {
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

    dispatch(register({ ...userInfo }));
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
          label={"Your full name"}
          onChange={(e) => setuserInfo({ ...userInfo, name: e.target.value })}
        />
        <Input
          label={"Your email address"}
          onChange={(e) => setuserInfo({ ...userInfo, email: e.target.value })}
        />
        <Input
          label="Phone Number"
          onChange={(e) => setuserInfo({ ...userInfo, phone: e.target.value })}
        />
        <Input
          label="Country"
          onChange={(e) =>
            setuserInfo({ ...userInfo, country: e.target.value })
          }
        />
        <CategorySelect
          onChange={(e) => setuserInfo({ ...userInfo, role: e.target.value })}
          options={options}
        />
        <Input
          label={"Password"}
          type="password"
          onChange={(e) =>
            setuserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <Input
          label={"Confirm Password"}
          type="password"
          onChange={(e) =>
            setuserInfo({ ...userInfo, confirmPassword: e.target.value })
          }
        />

        <button className={styles.submitButton} onClick={registerUser}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
