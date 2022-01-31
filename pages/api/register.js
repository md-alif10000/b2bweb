import User from "../../models/User";
import sendToken from "../../utils/jwtToken";
import connectDatabase from "../../utils/dbconnect";

export default async function handler(req, res) {
  await connectDatabase();
  try {
    if (req.method === "POST") {
      const { name, email, password } = req.body;
      if(!name){
          return "name is required"
      }
      if(!email){
        return "email is required"
    }
    if(!password){
        return "password is required"
    }
    

      const user = await User.create({
        name,
        email,
        password,
        //   avatar: {
        //     public_id: myCloud.public_id,
        //     url: myCloud.secure_url,
        //   },
      });

      sendToken(user, 201, res);
    }
  } catch (error) {
    console.log(error);
  }
}
