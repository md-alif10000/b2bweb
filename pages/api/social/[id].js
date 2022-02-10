// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Social from "../../../models/Social";
import connectDatabase from "../../../utils/dbconnect";

export default async function handler(req, res) {
  const { method } = req;
  connectDatabase();

  if (method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Social id  is required" });
    }

    try {
      const deletedUnit = await Social.findByIdAndDelete(id);

      return res.status(200).json({ deletedUnit });
    } catch (error) {
    
     return res.status(500).json({ error });
    }
  }
}
