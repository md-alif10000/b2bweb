const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please Enter About us"],
    },
   
    image: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.About ||
  mongoose.model("About", AboutSchema);
