import User from "../../models/User";
import sendToken from "../../utils/jwtToken";
import connectDatabase from "../../utils/dbconnect";
export default async function handler(req, res) {
  const { method } = req;
  const { email, password } = req.body;
  await connectDatabase()

  if (method == "POST") {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password is required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    sendToken(user, 200, res);
  }
}
