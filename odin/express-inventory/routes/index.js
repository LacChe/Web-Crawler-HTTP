const express = require("express");
const router = express.Router();

// Require controller modules.
const item_controller = require("../controllers/itemController");
const category_controller = require("../controllers/categoryController");

/// CATEGORY ROUTES ///

// GET home page.
router.get("/", category_controller.category_list);
router.get("/categories", category_controller.category_list);

// GET request for creating a Category. NOTE This must come before routes that display Category (uses id).
router.get("/categories/create", category_controller.category_create_get);

// POST request for creating Category.
router.post("/categories/create", category_controller.category_create_post);

// GET request to delete Category.
router.get("/categories/:id/delete", category_controller.category_delete_get);

// POST request to delete Category.
router.post("/categories/:id/delete", category_controller.category_delete_post);

// GET request to update Category.
router.get("/categories/:id/update", category_controller.category_update_get);

// POST request to update Category.
router.post("/categories/:id/update", category_controller.category_update_post);

// GET request for one Category.
router.get("/categories/:id", category_controller.category_detail);

/// ITEM ROUTES ///

// GET request for creating Item. NOTE This must come before route for id (i.e. display item).
router.get("/items/create", item_controller.item_create_get);

// POST request for creating Item.
router.post("/items/create", item_controller.item_create_post);

// GET request to delete Item.
router.get("/items/:id/delete", item_controller.item_delete_get);

// POST request to delete Item.
router.post("/items/:id/delete", item_controller.item_delete_post);

// GET request to update Item.
router.get("/items/:id/update", item_controller.item_update_get);

// POST request to update Item.
router.post("/items/:id/update", item_controller.item_update_post);

// GET request for one Item.
router.get("/items/:id", item_controller.item_detail);

// GET request for list of all Items.
router.get("/items", item_controller.item_list);

module.exports = router;