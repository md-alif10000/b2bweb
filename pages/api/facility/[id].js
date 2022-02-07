// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Facility from "../../../models/Facility";
import connectDatabase from "../../../utils/dbconnect";
import cloudinary from '../../../utils/cloudinary'

export default async function handler(req, res) {
  const { method } = req;
  connectDatabase();

  if (method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Facility id  is required" });
    }

    try {
      const item = await Facility.findById(id);
      const deleteImage = await cloudinary.v2.uploader.destroy(
        item.image.public_id
      );

      const deletedFacility = await Facility.findByIdAndDelete(id);

      return res.status(200).json({ deletedFacility });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  if (method === "PUT") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Facility id  is required" });
    }

    try {
      const updatedFacility = await Facility.findByIdAndUpdate(id, {
        ...req.body,
      });

      return res.status(200).json({ updatedFacility });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
