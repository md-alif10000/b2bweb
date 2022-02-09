const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please EnterPaymentMethod name"],
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PaymentMethod ||
  mongoose.model("PaymentMethod", PaymentMethodSchema);
