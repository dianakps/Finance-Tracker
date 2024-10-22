import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("expense", expenseSchema);
