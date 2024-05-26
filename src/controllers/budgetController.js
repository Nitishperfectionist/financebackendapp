const Budget = require('../models/Budget.js');

const createBudget = async (req, res) => {
  const { amount, month, year } = req.body;
  const userId = req.user.userId;

  try {
    const budget = new Budget({
      amount,
      month,
      year,
      userId,
    });
    await budget.save();

    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBudgets = async (req, res) => {
  const userId = req.user.userId;

  try {
    const budgets = await Budget.find({ userId });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { amount, month, year } = req.body;
  const userId = req.user.userId;

  try {
    const budget = await Budget.findOneAndUpdate(
      { _id: id, userId },
      { amount, month, year },
      { new: true }
    );

    res.status(200).json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBudget = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    await Budget.findOneAndDelete({ _id: id, userId });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
};
