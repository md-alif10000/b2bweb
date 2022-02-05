// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Category from "../../models/Category";
import connectDatabase from "../../utils/dbconnect";
export default async function handler(req, res) {
  const { method } = req;

  await connectDatabase();

  if (method === "GET") {
    try {
      const categories = await Category.find().sort({createdAt:-1});

      return res.status(200).json({ categories });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  if (method === "POST") {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ error: "Category Name  is required" });
    }

    try {
      const alreadyHave = await Category.findOne({ name: category });

      if (alreadyHave) {
        return res.status(409).json({ message: "Category already exist" });
      }
      const _cat = new Category({
        name: category,
      });

      const newCategory = await _cat.save();
      return res.status(201).json({ newCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
