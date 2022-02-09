const mongoose = require("mongoose");

const TermSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Term name"],
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Term || mongoose.model("Term", TermSchema);
