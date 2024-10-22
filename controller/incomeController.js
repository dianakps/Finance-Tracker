import Income from "../model/Income.js";

// CRUD

export const create = async (req, res) => {
  try {
    const addIncome = new Income(req.body);
    const { description } = addIncome;
    const descriptionExist = await Income.findOne({ description });
    if (descriptionExist) {
      return res.status(400).json({ message: "Description already exists." });
    }
    const savedDescription = await addIncome.save();
    res.status(200).json(savedDescription);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

export const update = async (req, res) => {
  try {
    const description = req.body.description;
    const newAmount = req.body.amount;
    const descriptionExists = await Income.findOne({ description });
    if (!descriptionExists) {
      return res.status(404).json({ message: "Description not found." });
    }
    const updateDescription = await Income.findOneAndUpdate(
      { description: description },
      { $set: { amount: newAmount } },
      { upsert: true, returnDocument: "after" }
    );
    res.status(201).json(updateDescription);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

export const fetch = async (req, res) => {
  try {
    const allDescriptions = await Income.find();
    if (allDescriptions.length === 0) {
      return res.status(400).json({ message: "No descriptoins found." });
    }
    res.status(200).json(allDescriptions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

export const remove = async (req, res) => {
  try {
    const description = req.body.description;
    const descriptionExist = await Income.findOne({ description });
    if (!descriptionExist) {
      return res.status(404).json({ message: "Description not found." });
    }
    await Income.findOneAndDelete({ description });
    res.status(201).json({ message: "Description succesfully deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};
