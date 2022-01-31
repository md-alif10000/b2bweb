export const manufacturerValidate = ({
  fullName,
  email,
  productInfo,
  businessInfo,
}) => {
  if (fullName === "") {
    return "Full name is required";
  }

  if (email === "") {
    return "Your email is required";
  }
  if (businessInfo.name === "") {
    return "Business Name is required";
  }
  if (businessInfo.website === "") {
    return "Business website is required";
  }
  if (businessInfo.phoneNumber === "") {
    return "Phone number is required";
  }
  if (businessInfo.country === "") {
    return "Country is required";
  }
  if (businessInfo.address === "") {
    return "Business address is required";
  }
  if (productInfo.name === "") {
    return "Product Name is required";
  }
  if (productInfo.category === "") {
    return "Product category is required";
  }

  if (productInfo.industry === "") {
    return "Product Details is required";
  }
  if (productInfo.identification === "") {
    return "Product identification is required";
  }
  if (productInfo.description === "") {
    return "Product description is required";
  }
};
