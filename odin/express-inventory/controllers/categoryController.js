const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Category.
exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().sort({ name: 1 }).exec();
    res.render("category_list", {
        title: "Category List",
        category_list: allCategories,
    });
});

// Display detail page for a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
    const [category, allItems] = await Promise.all([
      Category.findById(req.params.id).exec(),
      Item.find({ category: req.params.id }, "name description price numberInStock").exec(),
    ]);
    res.render("category_details", {
        title: "Category Details",
        category: category,
        items_list: allItems,
    });
});

// Display Category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
});

// Handle Category create on POST.
exports.category_create_post = [
  // Validate and sanitize the name field.
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .notEmpty()
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const category = new Category({ 
      name: req.body.name, 
      description: req.body.description 
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      const categoryExists = await Category.findOne({ 
        name: req.body.name, 
        description: req.body.description 
      }).exec();
      if (categoryExists) {
        // Category exists, redirect to its detail page.
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        // New category saved. Redirect to category detail page.
        res.redirect(category.url);
      }
    }
  }),
];

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of category
  const [category, allItemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name").exec(),
  ]);

  if (category === null) {
    // No results.
    res.redirect("/categories");
  }

  res.render("category_delete", {
    title: "Delete Category",
    category: category,
    category_items: allItemsInCategory,
  });
});

// Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, allItemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name").exec(),
  ]);

  if (allItemsInCategory.length > 0) {
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      category_items: allItemsInCategory,
    });
    return;
  } else {
    await Category.findByIdAndRemove(req.body.categoryid);
    res.redirect("/categories");
  }
});

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  // Get category for form.
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    // No results.
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_form", {
    title: "Update Category",
    category: category,
  });
});

// Handle Category update on POST.
exports.category_update_post = [
  // Validate and sanitize the name field.
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .notEmpty()
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const category = new Category({ 
      name: req.body.name, 
      description: req.body.description, 
      _id: req.params.id 
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // New category saved. Redirect to category detail page.
      const thecategoryinstance = await Category.findByIdAndUpdate(req.params.id, category, {});
      res.redirect(thecategoryinstance.url);
    }
  }),
];