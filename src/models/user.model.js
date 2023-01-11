// User model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Expense = require("./expense.model");
const Category = require("./category.model");
const Account = require("./account.model");

// User schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    // An array of categories
    category: [
      {
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category"}
      },
    ],
    // An array of accounts
    accounts: [
      {
        account: { type: mongoose.Schema.Types.ObjectId, ref: "Account"}
      },
    ],
    // An array of expenses
    expenses: [
      {
     expense:  { type: mongoose.Schema.Types.ObjectId, ref: "Expense" },
      },
    ],
  });

// Export user model
const User = mongoose.model("User", userSchema);
module.exports = User;
