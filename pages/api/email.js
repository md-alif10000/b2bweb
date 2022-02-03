// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Email from "../../models/Email";
import connectDatabase from "../../utils/dbconnect";
export default async function handler(req, res) {
  const { method } = req;

  await connectDatabase();

  if (method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email  is required" });
    }

    try {
      const alreadyHave = await Email.findOne({ email });

      if (alreadyHave) {
        return res.status(409).json({message:"Email already exist"});
      }
      const mail = new Email({
        email,
      });

      const newEmail = await mail.save();
      return res.status(201).json({ mail });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
