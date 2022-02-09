// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PaymentMethod from "../../../models/PaymentMethod";
import connectDatabase from "../../../utils/dbconnect";
export default async function handler(req, res) {
  const { method } = req;

  await connectDatabase();

  if (method === "GET") {
    try {
      const paymentmethods = await PaymentMethod.find().sort({ createdAt: -1 });

      return res.status(200).json({ paymentmethods });
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
      const _method = new PaymentMethod({
        name,
      });

      const method = await _method.save();
      return res.status(201).json({ method });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
