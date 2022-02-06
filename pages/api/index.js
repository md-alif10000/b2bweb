import Manufacturer from "../../models/Manufacturer";
import Importer from "../../models/ImporterQuotation";
import Category from "../../models/Category";
import connectDatabase from "../../utils/dbconnect";

export default async function handler(req, res) {
  await connectDatabase();

  try {
    const totalExportersQuotations = await Manufacturer.find().countDocuments();
    const totalImportersQuotations = await Importer.find().countDocuments();
    const totalCategories = await Category.find().countDocuments();

    return res
      .status(200)
      .json({
        totalCategories,
        totalImportersQuotations,
        totalExportersQuotations,
      });
  } catch (error) {

    return res.status(500).json(error)


  }
}
