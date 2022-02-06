import ImporterQuotation from "../../../models/ImporterQuotation";
import connectDatabase from "../../../utils/dbconnect";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  await connectDatabase();

  if (method === "GET") {
    try {
      const importer = await ImporterQuotation.findById(id);
      return res.status(200).json({ importer });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }

  if (method === "DELETE") {
    try {
      const deletedImporter = await ImporterQuotation.findByIdAndDelete(id);
      return res.status(200).json({ deletedImporter });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
}
