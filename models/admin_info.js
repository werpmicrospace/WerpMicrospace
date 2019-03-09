var mongoose = require('mongoose');

var adminInfoSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    team : String,
});

module.exports=mongoose.model("AdminInfo",adminInfoSchema);