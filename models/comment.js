var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    author: String,
    text: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

module.exports = mongoose.model("Comment", commentSchema);