// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Testimonial from "../../../models/Testimonial";
import connectDatabase from "../../../utils/dbconnect";
export default async function handler(req, res) {
  const { method } = req;

  await connectDatabase();

  if (method === "GET") {
    try {
      const Testimonials = await Testimonial.find().sort({ createdAt: -1 });

      return res.status(200).json({ Testimonials });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  if (method === "POST") {

    

    try {
      const _Testimonial = new Testimonial({
       ...req.body
      });

      const newSocial = await _Social.save();
      return res.status(201).json({ newSocial });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
