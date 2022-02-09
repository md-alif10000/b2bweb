// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Term from "../../../models/Term";
import connectDatabase from "../../../utils/dbconnect";
export default async function handler(req, res) {
  const { method } = req;

  await connectDatabase();

  if (method === "GET") {
    try {
      const terms = await Term.find().sort({ createdAt: -1 });

      return res.status(200).json({ terms });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  if (method === "POST") {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Term Name  is required" });
    }

    try {
      const _Term = new Term({
        name,
      });

      const newTerm = await _Term.save();
      return res.status(201).json({ newTerm });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
