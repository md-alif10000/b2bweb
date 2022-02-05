const mongoose = require("mongoose");

const HomePage = mongoose.Schema(
  {
    hero: {
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
      heading: {
        type: String,
        required: true,
      },
      paragraph: {
        type: String,
        required: true,
      },
      emailHeading: {
        type: String,
        required: true,
      },
    },
    signin: {
      heading: {
        type: String,
        required: true,
      },
      texts: [
        {
          type: String,
          required: true,
        },
      ],
      paragraph: {
        type: String,
        required: true,
      },
    },

    facilities: {
      heading: {
        type: String,
        required: true,
      },
    },
    quote: {
      heading: {
        type: String,
        required: true,
      },
      paragraph: {
        type: String,
        required: true,
      },
      leftText: {
        type: String,
        required: true,
      },
    },

    testimonial: {
      heading: {
        type: String,
        required: true,
      },
      videos: [
        {
          link: {
            type: String,
            required: true,
          },
        },
      ],
      testimonials: [
        {
          text: {
            type: String,
            required: true,
          },
          username: {
            type: String,
            required: true,
          },
        },
      ],
    },

    contact: {
      headnig: {
        type: String,
        required: true,
      },
      contact1: {
        title: {
          type: String,
          required: true,
        },
        contact: {
          type: String,
          required: true,
        },
      },
      contact2: {
        title: {
          type: String,
          required: true,
        },
        contact: {
          type: String,
          required: true,
        },
      },
      contact3: {
        title: {
          type: String,
          required: true,
        },
        contact: {
          type: String,
          required: true,
        },
      },
    },
    footer:{
      
    }
  },
  { timestamps: true }
);

export default mongoose.models.HomePage || mongoose.model("HomePage", HomePage);
