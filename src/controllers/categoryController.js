const Category = require('../models/Category.js');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;

  try {
    const category = new Category({
      name,
      userId,
    });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  const userId = req.user.userId;

  try {
    const categories = await Category.find({ userId });
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.user.userId;

  try {
    const category = await Category.findOneAndUpdate(
      { _id: id, userId },
      { name },
      { new: true }
    );

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    await Category.findOneAndDelete({ _id: id, userId });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
