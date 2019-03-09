var mongoose = require("mongoose");

var userInfoSchema = new mongoose.Schema({
    name : String,
    college : String,
    email : String,
    password : String,
    team : String,
    leader : String

});

module.exports = mongoose.model("UserInfo", userInfoSchema);