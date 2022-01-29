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

    let images = req.files ? req.files : [];
    let productImages = [];
    if (req.files) {
      if (req.files.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i].path, {
            folder: "manufacturer",
          });
          productImages.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      }
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
}
