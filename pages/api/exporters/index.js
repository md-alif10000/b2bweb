import Manufacturer from "../../../models/Manufacturer";
import connectDatabase from "../../../utils/dbconnect";

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
    const { productInfo, businessInfo, ownersInfo } = req.body;
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
      ownersInfo,
      businessInfo,
      productInfo,
    });

    const newManufacturer = await manufacturer.save();
    return res.status(201).json({ manufacturer });
    // } catch (error) {
    //   res.status(500).json({ error });
    // }
  }
}
