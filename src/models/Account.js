// Account model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    account: String,
});

module.exports = mongoose.model("Account", AccountSchema);