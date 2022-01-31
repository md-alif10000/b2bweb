import { toast } from "react-toastify";

export const importersValidate = ({ productInfo, userInfo, shippingInfo }) => {
  if (productInfo.productName === "") {
    return "Product Name is required";
  }
  if (productInfo.productCategory === "") {
    return "Product category is required";
  }

  if (productInfo.productDetails === "") {
    return "Product Details is required";
  }
  if (productInfo.quantity === "") {
    return "Product quantity is required";
  }
  if (productInfo.budget === "") {
    return "Product budget is required";
  }
  if (shippingInfo.shippingMethod === "") {
    return "Product Name is required";
  }
  if (productInfo.destination === "") {
    return "Product Name is required";
  }
  if (productInfo.leadtime === "") {
    return "Product Name is required";
  }
  if (productInfo.paymentMethod === "") {
    return "Payment method is required";
  }
  if (userInfo.fullName === "") {
    return "Product Name is required";
  }
  if (userInfo.mobileNumber === "") {
    return "Mobile number is required";
  }

  if (userInfo.email === "") {
    return "Your email is required";
  }
};
