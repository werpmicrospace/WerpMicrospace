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
   
    userid:{
        type:mongoose.Schema.Types.ObjectId,
    }
    
    

});

module.exports=mongoose.model('AdminTask',adminTaskSchema);