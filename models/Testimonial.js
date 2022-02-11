const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please Ente rTestimonial name"],
      unique: true,
    },
    unerName:{
        type: String,
        required: [true, "Please Enter Testimonial User name"],
        unique: true,
      },
    image:{
        public_url:String,
        url:String
    }
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
