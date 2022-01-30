import Manufacturer from "../../models/Manufacturer";
import connectDatabase from "../../utils/dbconnect";

export default async function handler(req, res) {
  const { method } = req;
  await connectDatabase();

  if (method === "GET") {
    try {
      const manufacturers = await Manufacturer.find();

      return res.status(200).json({ manufacturers });
    } catch (error) {
      console.log(error);
    }
  }
  if (method == "POST") {
    const { productInfo, businessInfo, fullName, email, role } = req.body;
    if (
      !productInfo.name &&
      !productInfo.category &&
      !productInfo.industry &&
      !productInfo.description
    ) {
      return res
        .status(400)
        .json({ error: "All fields of Product is required" });
    }

    // try {
    const manufacturer = new Manufacturer({
      fullName,
      email,
      role,
      businessInfo,
      productInfo,
    });

    const newManufacturer = await manufacturer.save();
    return res.status(201).json({ manufacturer });
    // } catch (error) {
    //   res.status(500).json({ error });
    // }
  }
  if (method ==="DELETE") {
    const { _id } = req.body;
    console.log(req.body);

    try {
      const deletedManufacturer = await Manufacturer.deleteOne({ _id });
      return res.status(200).json({ deletedManufacturer });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
}
