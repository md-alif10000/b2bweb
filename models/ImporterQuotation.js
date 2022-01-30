const mongoose = require("mongoose");

const ImporterQuotation = mongoose.Schema(
  {
    productInfo: {
      productName: {
        type: String,
        required: true,
      },
      productCategory: {
        type: String,
      },
      sourcingType: {
        type: String,
        required: true,
      },
      productDetails: {
        type: String,
        required: true,
      },
      image: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      quantity: {
        type: String,
        required: true,
      },
      budget: {
        type: String,
        required: true,
      },
      tradeterms: {
        type: Number,
      },
    },
    shippingInfo: {
      shippingMethod: {
        type: String,
        required: true,
      },
      destination: {
        type: String,
        required: true,
      },
      leadtime: {
        type: String,
        required: true,
      },
      paymentMethod: {
        type: String,
        required: true,
      },
    },
    userInfo: {
      fullName: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
      },
      mobileNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      website: {
        type: String,
      },
      affiliate: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

// orderSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// orderSchema.set('toJSON', {
//     virtuals: true,
// });

export default mongoose.models.ImporterQuotation ||
  mongoose.model("ImporterQuotation", ImporterQuotation);
