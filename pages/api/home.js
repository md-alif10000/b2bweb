import HomePage from "../../models/HomePage";
import connectDatabase from "../../utils/dbconnect";

export default async function handler(req, res) {
  await connectDatabase();

  const { method } = req;

  if (method == "GET") {
    try {
      const _home = await HomePage.find();
      const home = _home[0];

      return res.status(200).json({ home });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
  if (method == "PUT") {
    try {
      const home = await HomePage.findOneAndUpdate({_id:req.body._id},{
        ...req.body,
      },{new:true});

      return res.status(201).json({ home });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  if (method == "POST") {
    try {
      const home = await new HomePage({
        ...req.body,
      });
      const newHome = await home.save();

      return res.status(201).json({ home });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
