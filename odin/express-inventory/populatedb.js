#! /usr/bin/env node

  const Item = require("./models/item");
  const Category = require("./models/category");
  require('dotenv').config();
  
  const categories = [];
  const items = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = process.env.MONGO_DB_STRING;
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function createCategory(name, description) {
    const category = new Category({ name: name, description: description });
    await category.save();
    categories.push(category);
    console.log(`Added category: ${name}`);
  }
  
  async function createItem(name, description, category, price, numberInStock) {
    itemDetail = {
      name: name,
      description: description,
      category: category,
      price: price,
      numberInStock: numberInStock,
    };
  
    const item = new Item(itemDetail);
    await item.save();
    items.push(item);
    console.log(`Added item: ${name}`);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      createCategory("C-0", "C-0-desc"),
      createCategory("C-1", "C-1-desc"),
      createCategory("C-2", "C-2-desc"),
      createCategory("C-3", "C-3-desc"),
      createCategory("C-4", "C-4-desc"),
    ]);
  }
  
  async function createItems() {
    console.log("Adding items");
    await Promise.all([
      createItem("I-0", "I-0-desc", categories[0], 0, 10),
      createItem("I-1", "I-1-desc", categories[0], 2, 8),
      createItem("I-2", "I-2-desc", categories[1], 5, 5),
      createItem("I-3", "I-3-desc", categories[2], 6, 3),
      createItem("I-4", "I-4-desc", categories[3], 12, 0),
    ]);
  }