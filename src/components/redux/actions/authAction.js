import toast from "react-toastify";
import { authConstants } from "../constants";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const register = (state) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.REGISTER_REQUEST });

    try {
      const res = await axios.post("/api/register", state);
      const { token } = res.data;
      if (res.status == 201) {
        toast.success("Successfully Registered...!");
        dispatch({
          type: authConstants.REGISTER_SUCCESS,
          payload: res.data,
        });
        localStorage.setItem("token", token);
        dispatch({ type: "SET_TOKEN", payload: token });
      }
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.errors);

      dispatch({
        type: authConstants.REGISTER_FAILURE,
        payload: error.response.data.errors,
      });
    }
  };
};

export const login = (state) => {
  console.log(state);
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    try {
      const res = await axios.post("/api/login", state);
      console.log(res);
      const { token } = res.data;
      console.log(token);
      if (res.status == 200) {
        localStorage.setItem("token", token);
        toast.success("Login successful..!");
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: res.data,
        });

        const decoded = jwtDecode(token);
        console.log(decoded);
        dispatch({ type: "SET_TOKEN", payload: token });
      }
    } catch (error) {
      //   toast.error("Something went wrong");
      //   dispatch({
      //     type: authConstants.LOGIN_FAILURE,
      //     payload: error.response.data.errors,
      //   });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    console.log("Logging out........");
    try {
      dispatch({ type: authConstants.LOGOUT_REQUEST });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      dispatch({ type: authConstants.LOGOUT_SUCCESS });
    } catch (error) {
      console.log(error);
    }
  };
};
