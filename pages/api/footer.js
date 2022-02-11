import About from "../../models/About";
import Social from "../../models/Social";
import connectDatabase from "../../utils/dbconnect";

export default async function handler(req, res) {
  await connectDatabase();

  const { method } = req;

  if (method == "GET") {
    try {
      const socials = await Social.find();

      const _about = await About.find();
      const about = _about[0];

      return res.status(200).json({ socials, about });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}
