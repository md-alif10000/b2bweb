// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Partner from "../../../models/Partner";
import connectDatabase from "../../../utils/dbconnect";
export default async function handler(req, res) {
  const { method } = req;

  await connectDatabase();

  if (method === "GET") {
    try {
      const partners = await Partner.find().sort({ createdAt: -1 });

      return res.status(200).json({ partners });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  if (method === "POST") {
    const { name,image } = req.body;

    if(!name) return res.status(400).json({message:"Name is required"})
    if(!image.public_id) return res.status(400).json({message:"Image is required"})

    try {
      const alreadyHave = await Partner.findOne({ name });

      if (alreadyHave) {
        return res.status(409).json({ message: "Partner already exist" });
      }
      const partner = new Partner({
        name,
        image
      });

      const newPartner = await partner.save();
      return res.status(201).json({ partner });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

 
}
