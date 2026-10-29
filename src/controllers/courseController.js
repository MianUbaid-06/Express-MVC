const Course = require("../models/courseModel");
const Category = require("../models/categoryModel");

exports.getAll = (req, res) => {
  const courses = Course.getAll();

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
};

exports.getOne = (req, res) => {
  const course = Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found"
    });
  }

  res.status(200).json({
    success: true,
    data: course
  });
};

exports.create = (req, res) => {
  const {
    title,
    description,
    categoryId,
    duration
  } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    !categoryId
  ) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: ["title and categoryId are required"]
    });
  }

  if (!Category.findById(String(categoryId))) {
    return res.status(400).json({
      success: false,
      message: "categoryId does not match an existing category"
    });
  }

  const course = Course.create({
    title: title.trim(),
    description: description
      ? String(description).trim()
      : "",
    categoryId: String(categoryId),
    duration: duration
      ? String(duration).trim()
      : ""
  });

  res.status(201).json({
    success: true,
    message: "Course created",
    data: course
  });
};

exports.update = (req, res) => {
  const updates = {};

  if (req.body.title !== undefined) {
    if (
      typeof req.body.title !== "string" ||
      !req.body.title.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "title must be a non-empty string"
      });
    }

    updates.title = req.body.title.trim();
  }

  if (req.body.description !== undefined) {
    updates.description = String(req.body.description).trim();
  }

  if (req.body.duration !== undefined) {
    updates.duration = String(req.body.duration).trim();
  }

  if (req.body.categoryId !== undefined) {
    if (!Category.findById(String(req.body.categoryId))) {
      return res.status(400).json({
        success: false,
        message: "Invalid categoryId"
      });
    }

    updates.categoryId = String(req.body.categoryId);
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one field to update"
    });
  }

  const course = Course.update(req.params.id, updates);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Course updated",
    data: course
  });
};

exports.remove = (req, res) => {
  const deleted = Course.remove(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Course not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Course deleted"
  });
};