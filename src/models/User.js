// User model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Expense = require("./Expenses");

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    expenses: [Expense.schema],
});

module.exports = mongoose.model("User", userSchema);