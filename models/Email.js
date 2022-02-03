const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique:true
    },
  },
  { timestamps: true }
);

export default mongoose.models.Email || mongoose.model("Email", emailSchema);
