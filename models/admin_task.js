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
    id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
    },
    comments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }]
    

});

module.exports=mongoose.model('AdminTask',adminTaskSchema);