// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Terms from "../../../models/Terms";
import connectDatabase from "../../../utils/dbconnect";
export default async function handler(req, res) {
  const { method } = req;

  await connectDatabase();

  if (method === "GET") {
    try {
      const importersTerms = await Terms.find({ for: "importers" }).sort({
        createdAt: -1,
      });

      const exportersTerms = await Terms.find({ for: "exporters" }).sort({
        createdAt: -1,
      });

      return res.status(200).json({ importersTerms, exportersTerms });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  if (method === "POST") {
    const { text, For } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Terms Text  is required" });
    }

    try {
      const _Terms = new Terms({
        text,
        for: For,
      });

      const newTerms = await _Terms.save();
      return res.status(201).json({ newTerms });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
