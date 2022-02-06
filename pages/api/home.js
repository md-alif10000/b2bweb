import HomePage from "../../models/HomePage";
import connectDatabase from "../../utils/dbconnect";

export default async function handler(req, res) {
  await connectDatabase();

  const { method } = req;

  if (method == "GET") {
    try {
      const home = await HomePage.find()

      return res.status(200).json({ home });
    } catch (error) {
        console.log(error);
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
