
import mongoose from "mongoose";
import Category from "../Models/category.model.js"

export const addCategory = async (req, res) => {
  
  console.log("Inside add category")
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error, "error");
    res.status(400).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategories = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, updates);

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res
      .status(201)
      .json({ data: updatedCategory, message: "Category update sucessfully" });
  } catch (err) {
    res.status(400).json({ message: "error.message" });
  }
};

export const getCategoryById = async (req, res) => {
  
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategoryById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID Format" });
  }

  try {
    const deleteCategory = await Category.findByIdAndDelete(id);

    if (!deleteCategory) {
      return res.status(404).json({ message: "category not found" });
    }

    res.status(200).json({ message: "category deleted sucessfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


