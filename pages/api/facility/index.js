// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Facility from "../../../models/Facility";
import connectDatabase from "../../../utils/dbconnect";
export default async function handler(req, res) {
  const { method } = req;

  await connectDatabase();

  if (method === "GET") {
    try {
      const facilities = await Facility.find().sort({ createdAt: -1 });

      return res.status(200).json({ facilities });
    } catch (error) {
      console.log(error);
     return res.status(500).json({ error });
    }
  }

  if (method === "POST") {
    const { facility } = req.body;

    if (!facility) {
      return res.status(400).json({ error: "Facility Name  is required" });
    }

    try {
      const alreadyHave = await Facility.findOne({ name:facility.name});

      if (alreadyHave) {
        return res.status(409).json({ message: "Facility already exist" });
      }
      const _fac = new Facility({
        ...facility,
      });

      const newFacility = await _fac.save();
      return res.status(201).json({ newFacility });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
