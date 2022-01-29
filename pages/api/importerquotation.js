import ImporterQuotation from "../../models/ImporterQuotation";
import connectDatabase from "../../utils/dbconnect";

export default async function handler(req, res) {
  const { method } = req;
  await connectDatabase();

  if (method === "GET") {
    try {
      const importerQuotations = await ImporterQuotation.find();

      return res.status(200).json({ importerQuotations });
    } catch (error) {
      console.log(error);
    }
  }
  if (method == "POST") {
    const { productInfo, shippingInfo, userInfo } = req.body;
    if (
      !productInfo.productName &&
      !productInfo.productCategory &&
      !productInfo.productDetails &&
      !productInfo.budget &&
      !productInfo.quantity &&
      !productInfo.tradeterms &&
      !productInfo.sourcingType
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
            folder: "importers",
          });
          productImages.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      }
    }

    // try {
    const quotation = new ImporterQuotation({
      productInfo,
      shippingInfo,
      userInfo,
    });

    const newProduct = await quotation.save();
    return res.status(201).json({ quotation });
    // } catch (error) {
    //   res.status(500).json({ error });
    // }
  }
}
