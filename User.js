const mongoose = require("mongoose");
const { Schema } = mongoose;

const Income = new Schema(
  {
    amount: Number,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("income", Income);
