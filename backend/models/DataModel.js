const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  phone_no:{
    type: Number,
    required: [true, "Please Enter Your Phone No."],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your email"],
  },
  hobbies: {
    type: String,
    required: [true, "Please Enter Your Hobbies"],
  }
});

module.exports = mongoose.model("Data", dataSchema);