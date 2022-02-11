const mongoose = require("mongoose");

const SocialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Ente rSocial name"],
      unique: true,
    },
    url:{
        type: String,
        required: [true, "Please Enter social URL"],
        unique: true,
      },
    image:{
        public_url:String,
        url:String
    }
  },
  { timestamps: true }
);

export default mongoose.models.Social || mongoose.model("Social", SocialSchema);
