const Transaction = require('../models/Transaction.js');

const createTransaction = async (req, res) => {
  const { amount, type, categoryId } = req.body;
  const userId = req.user.userId;

  try {
    const transaction = new Transaction({
      amount,
      type,
      categoryId,
      userId,
    });
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTransactions = async (req, res) => {
  const userId = req.user.userId;

  try {
    const transactions = await Transaction.find({ userId }).populate('categoryId');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, type, categoryId } = req.body;
  const userId = req.user.userId;

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, userId },
      { amount, type, categoryId },
      { new: true }
    );

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    await Transaction.findOneAndDelete({ _id: id, userId });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
