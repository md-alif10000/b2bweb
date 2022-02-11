const mongoose = require("mongoose");

const Manufacturer = mongoose.Schema(
  {
    ownersInfo: [
      {
        fullName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        role: {
          type: String,
        },
      },
    ],
    businessInfo: {
      name: {
        type: String,
        required: true,
      },
      website: {
        type: String,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      entity: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },

    productInfo: {
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
      },
      industry: {
        type: String,
        required: true,
      },
      identification: {
        type: String,
      },
      description: {
        type: String,
        required: true,
      },
      persona: {
        type: String,
      },
      affiliate: {
        type: String,
      },
      images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
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

export default mongoose.models.Manufacturer ||
  mongoose.model("Manufacturer", Manufacturer);
