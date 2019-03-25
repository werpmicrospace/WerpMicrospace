var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var secretSchema = new mongoose.Schema({
    username: String,
    password: String
});


module.exports = mongoose.model("Secret", secretSchema);