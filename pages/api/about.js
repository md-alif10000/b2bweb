import About from "../../models/About";
import Social from "../../models/Social";
import connectDatabase from "../../utils/dbconnect";

export default async function handler(req, res) {
  await connectDatabase();

  const { method } = req;

  if (method == "GET") {
    try {
      const _about = await About.find();
      const socials = await Social.find();
      const about = _about[0];

      return res.status(200).json({ about,socials });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
  if (method == "PUT") {
    try {
      const home = await About.findOneAndUpdate(
        { _id: req.body._id },
        {
          ...req.body,
        },
        { new: true }
      );

      return res.status(201).json({ home });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  if (method == "POST") {
    try {
      const about = await new About({
        ...req.body,
      });
      const newHome = await about.save();

      return res.status(201).json({ about });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
