import Manufacturer from "../../../models/Manufacturer";
import connectDatabase from "../../../utils/dbconnect";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  await connectDatabase();


  if (method === "GET") {
    try {
      const manufacturer = await Manufacturer.findById(id);
      return res.status(200).json({ manufacturer });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }

  if (method === "DELETE") {
    try {
      const deletedManufacturer = await Manufacturer.findByIdAndDelete(id);
      return res.status(200).json({ deletedManufacturer });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
}
