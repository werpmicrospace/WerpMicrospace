var mongoose=require('mongoose');
var schema=mongoose.Schema;


var adminTaskSchema=new schema({
    taskname:{
        type:String,
    },
    description:{
        type:String,
    },
    details:{
        type:String,
    },
    teamleadname:{
        type:String,
    },
    score:{
        type:String
    },
    remarks:{
        type:String,
    },
    id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
    },
    username1:String,
    comments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }],
    username:String,
    status : String,
    color:String,
    date : String
    

});

module.exports=mongoose.model('AdminTask',adminTaskSchema);