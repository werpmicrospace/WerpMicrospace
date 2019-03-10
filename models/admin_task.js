var mongoose=require('mongoose');
var schema=mongoose.Schema;


var adminTaskSchema=new schema({
    taskname:{
        type:String,
    },
    description:{
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
    

});

module.exports=mongoose.model('AdminTask',adminTaskSchema);