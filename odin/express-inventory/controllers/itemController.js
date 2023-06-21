const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Items.
exports.item_list = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find().sort({ name: 1 }).exec();
    res.render("item_list", {
        title: "Item List",
        item_list: allItems,
    });
});

// Display detail page for a specific Item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  res.render("item_details", {
      title: "Item Details",
      item: item,
  });
});

// Display Item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().exec();

  res.render("item_form", {
    title: "Create Item",
    categories: allCategories,
  });
});

// Handle Item create on POST.
exports.item_create_post = [ // TODO
  // Validate and sanitize the name field.
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
    body("description", "Description must not be empty")
      .trim()
      .notEmpty()
      .escape(),
    body("category", "Category must not be empty").escape(),
    body("price", "Price must not be empty").escape(),
    body("number_in_stock", "Number in Stock must not be empty").escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Item object with escaped and trimmed data.
    const item = new Item({ 
      name: req.body.name, 
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      numberInStock: req.body.number_in_stock,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("item_form", {
        title: "Create Item",
        item: item,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Item with same name already exists.
      const itemExists = await Item.findOne({
        name: req.body.name, 
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        numberInStock: req.body.number_in_stock,
      }).exec();
      if (itemExists) {
        // Item exists, redirect to its detail page.
        res.redirect(itemExists.url);
      } else {
        await item.save();
        // New item saved. Redirect to item detail page.
        res.redirect(item.url);
      }
    }
  }),
];

// Display Item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of item
  const item = await Item.findById(req.params.id).exec();

  if (item === null) {
    // No results.
    res.redirect("/items");
  }

  res.render("item_delete", {
    title: "Delete Item",
    item: item,
  });
});

// Handle Item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndRemove(req.body.itemid);
  res.redirect("/items");
});

// Display Item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  // Get item for form.
  const item = await Item.findById(req.params.id).populate("category").exec();
  const allCategories = await Category.find().exec();

  if (item === null) {
    // No results.
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_form", {
    title: "Update Item",
    item: item,
    categories: allCategories,
  });
});

// Handle Item update on POST.
exports.item_update_post = [
  // Validate and sanitize the name field.
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
    body("description", "Description must not be empty")
      .trim()
      .notEmpty()
      .escape(),
    body("category", "Category must not be empty").escape(),
    body("price", "Price must not be empty").escape(),
    body("number_in_stock", "Number in Stock must not be empty").escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Item object with escaped and trimmed data.
    const item = new Item({ 
      name: req.body.name, 
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      numberInStock: req.body.number_in_stock,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("item_form", {
        title: "Create Item",
        item: item,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid
      const theiteminstance = await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect(theiteminstance.url);
    }
  }),
];