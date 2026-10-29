const Category = require("../models/categoryModel");

exports.getAll = (req, res) => {
  const categories = Category.getAll();

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
};

exports.getOne = (req, res) => {
  const category = Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found"
    });
  }

  res.status(200).json({
    success: true,
    data: category
  });
};

exports.create = (req, res) => {
  const { name, description } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: ["name is required"]
    });
  }

  const category = Category.create({
    name: name.trim(),
    description: description
      ? String(description).trim()
      : ""
  });

  res.status(201).json({
    success: true,
    message: "Category created",
    data: category
  });
};

exports.update = (req, res) => {
  const updates = {};

  if (req.body.name !== undefined) {
    if (
      typeof req.body.name !== "string" ||
      !req.body.name.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "name must be a non-empty string"
      });
    }

    updates.name = req.body.name.trim();
  }

  if (req.body.description !== undefined) {
    updates.description = String(req.body.description).trim();
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Provide name or description to update"
    });
  }

  const category = Category.update(req.params.id, updates);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Category updated",
    data: category
  });
};

exports.remove = (req, res) => {
  const deleted = Category.remove(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Category not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Category deleted"
  });
};