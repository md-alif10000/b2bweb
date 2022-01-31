import jwt_decode from "jwt-decode";
import { authConstants } from "../constants";

const initState = {
  loading: false,
  registerErrors: [],
  loginErrors: [],
  token: null,
  user: null,
};

const verifyToken = (token) => {
  console.log(token);
  const decodedToken = jwt_decode(token);
  const expireIn = new Date(decodedToken.exp * 1000);

  if (new Date() > expireIn) {
    localStorage.removeItem("token");
    return null;
  } else {
    return decodedToken;
  }
};

const getToken = async () => {
  let token;
  if (typeof localStorage !== "undefined") {
    token = await localStorage.getItem("token");
  } else {
    token = null;
  }

  return token;
};

const token = await getToken()
  .then((t) => t)
  .catch((err) => console.log(err));

if (token) {
  const decoded = verifyToken(token);
  if (decoded) {
    initState.token = token;
    const { user } = decoded;
    initState.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }
}

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.REGISTER_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case authConstants.REGISTER_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        token: action.payload.token,

        user: action.payload.user,
      });
    case authConstants.REGISTER_FAILURE:
      return (state = {
        ...state,
        loading: false,
        registerErrors: action.payload,
      });
    case authConstants.LOGIN_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case authConstants.LOGIN_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
      });
    case authConstants.LOGIN_FAILURE:
      return (state = {
        ...state,
        loading: false,
        loginErrors: action.payload,
      });
    case "SET_TOKEN":
      console.log(action.payload);
      const decoded = verifyToken(action.payload);
      const { user } = decoded;
      console.log(user);
      return (state = { ...state, token: action.payload, user: user });
    case authConstants.LOGOUT_SUCCESS:
      return (state = {
        ...state,
        token: "",
        user: "",
      });

    case authConstants.LOGOUT_SUCCESS:
      return (state = { ...state, token: null, user: null });
    // case profileTypes.REDIRECT_TRUE:
    //   return (state = {
    //     ...state,
    //     redirect: true,
    //   });
    // case profileTypes.REDIRECT_FALSE:
    //   return (state = {
    //     ...state,
    //     redirect: false,
    //   });
    default:
      return state;
  }
};

export default AuthReducer;
