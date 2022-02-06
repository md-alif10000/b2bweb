// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Category from "../../../models/Category";
import connectDatabase from "../../../utils/dbconnect";

export default async function handler(req, res) {
  const { method } = req;
  connectDatabase();

  if (method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Category id  is required" });
    }

    try {
      const deletedCategory = await Category.findByIdAndDelete(id);

      return res.status(200).json({ deletedCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  if (method === "PUT") {
    const { id } = req.query;
    const { category } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Category id  is required" });
    }

    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, {
        name: category,
      });

      return res.status(200).json({ updatedCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
