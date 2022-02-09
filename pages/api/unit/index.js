// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Unit from "../../../models/Unit";
import connectDatabase from "../../../utils/dbconnect";
export default async function handler(req, res) {
  const { method } = req;

  await connectDatabase();

  if (method === "GET") {
    try {
      const units = await Unit.find().sort({ createdAt: -1 });

      return res.status(200).json({ units });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  if (method === "POST") {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Unit Name  is required" });
    }

    try {
      const _unit = new Unit({
        name,
      });

      const newUnit = await _unit.save();
      return res.status(201).json({ newUnit });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
