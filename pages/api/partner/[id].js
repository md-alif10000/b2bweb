// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Partner from "../../../models/Partner";
import connectDatabase from "../../../utils/dbconnect";
import cloudinary from "../../../utils/cloudinary";

export default async function handler(req, res) {
  const { method } = req;
  connectDatabase();

  if (method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Partner id  is required" });
    }

    try {
      const item = await Partner.findById(id);
      console.log( item.image.public_id);
      const deleteImage = await cloudinary.v2.uploader.destroy(
        item.image.public_id
      );
      const deletedPartner = await Partner.findByIdAndDelete(id);
      return res.status(200).json({ deletedPartner });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  if (method === "PUT") {
    const { id } = req.query;
    const { category } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Category id  is required" });
    }

    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, {
        name: category,
      });

      return res.status(200).json({ updatedCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
