import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("income", incomeSchema);
