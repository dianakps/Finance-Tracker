import Expense from "../model/Expense.js";

// CRUD

export const create = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const { description } = newExpense;
    const expenseExists = await Expense.findOne({ description });
    if (expenseExists) {
      return res.status(400).json({ message: "Description already exists." });
    }
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const update = async (req, res) => {
  try {
    const description = req.body.description;
    const newAmount = req.body.amount;
    const newColor = req.body.color;
    const expenseExists = await Expense.findOne({ description });

    if (!expenseExists) {
      res.status(404).json({ message: "Expense does not exists." });
    }

    const updatedExpense = await Expense.findOneAndUpdate(
      { description: description },
      { $set: { amount: newAmount, color: newColor } },
      { upsert: true, returnDocument: "after" }
    );

    res.status(201).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const fetch = async (req, res) => {
  try {
    const showExpenses = await Expense.find();
    res.status(200).json(showExpenses);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const remove = async (req, res) => {
  try {
    const description = req.body.description;
    const expenseExists = await Expense.findOne({ description });
    if (expenseExists) {
      await Expense.findOneAndDelete({ description });
    } else {
      res.status(404).message({ message: "Expense was not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};
