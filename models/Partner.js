const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Partner name"],
      unique: true,
    },
    image: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Partner ||
  mongoose.model("Partner", PartnerSchema);
