const mongoose = require("mongoose");

const HomePage = mongoose.Schema(
  {
    hero: {
      image: {
        public_id: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          // required: true,
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
      formHeading: {
        type: String,
        required: true,
      },
    },

    testimonial: {
      heading: {
        type: String,
        required: true,
      },
      videos: [String],
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
      heading: {
        type: String,
        required: true,
      },
      contact1title: String,
      contact1detail: String,
      contact2title: String,
      contact2detail: String,
      contact3title: String,
      contact3detail: String,
    },
    footer: {
      social: [
        {
          link: {
            type: String,
          },
          icon: {
            type: String,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.HomePage || mongoose.model("HomePage", HomePage);
