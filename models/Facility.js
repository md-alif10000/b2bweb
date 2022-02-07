const mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Facility name"],
      unique: true,
    },
    image:{
        public_id:String,
        url:String
    }
  },
  { timestamps: true }
);

export default mongoose.models.Facility ||
  mongoose.model("Facility", FacilitySchema);
