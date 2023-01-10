// Expenses schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    id: Number,
    date: String,
    comment: String,
    amount: Number,
    importance: String,
    // an array of string of accounts
    account: [String],
    category: [String]
});

module.exports = mongoose.model("Expense", expenseSchema);