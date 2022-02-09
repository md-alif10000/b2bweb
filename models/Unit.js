const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please EnterUnit name"],
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Unit || mongoose.model("Unit", UnitSchema);
