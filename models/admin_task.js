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
    status:{
        type:String,
    },
    date:{
        type:String,
    },
    admin:{
        type:String,
    },
    users:{
        type:String,
        
    },
    comment:{
        type:String,
    },
    intername:{
        type:String,
      
    }
    
    

});

module.exports=mongoose.model('AdminTask',adminTaskSchema);