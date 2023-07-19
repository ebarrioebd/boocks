const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = new Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
});
module.exports = mongoose.model("user", User)