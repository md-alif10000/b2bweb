const mongoose = require("mongoose");

const TermsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please Enter Terms name"],
    },
    for: {
      type: String,
      required: true,
      enum: ["importers", "exporters"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.TermsCons || mongoose.model("TermsCons", TermsSchema);
