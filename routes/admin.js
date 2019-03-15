var express=require('express');
var router=express.Router();
var User = require("../models/user");
var Admin = require("../models/admin")
var UserInfo = require("../models/user_info");
var AdminInfo = require("../models/admin_info");
var AdminTask = require('../models/admin_task');
var Comment = require('../models/comment');


 

router.get("/showtasks", isLoggedIn, function(req,res){
// console.log(req);
// console.log(res);
AdminTask.find({admin:req.user._id}).then(data=>{
// console.log(data);
    res.render("admintasks/showadmintasks.ejs",{data:data});
})
});


router.get('/intern/dashboard',isLoggedIn,(req,res)=>{
// console.log(req.user);

AdminTask.find({users:req.user._id}).then(data=>{
// console.log(data[1]._id);

res.render('internwork/internwork.ejs',{data:data})
});


});

router.get('/intern/edit/:id',(req,res)=>{
    // console.log(req.body);
    // console.log(req.params);
    // console.log(req.user);
    
    
    res.render('internwork/intern_edit.ejs',{data:req.params.id});
});

router.post('/intern/edit/:id',(req,res)=>{
    // console.log(req);
    
    var interndata={
        status:req.body.status,
        date:req.body.date,
        comment:req.body.comment
    }
    
    AdminTask.updateOne({_id:req.params.id},interndata,(err,updated)=>{
        if(err){
            console.log(err);
            
        }else{
            res.redirect('/intern/dashboard')
        }
    })
});


router.post('/taskassigned',isLoggedIn,function(req,res){
    // console.log("after saving");
    
// console.log(req);
var newTask={
taskname:req.body.taskname,
description:req.body.description,
details:req.body.details,
admin:req.user._id,
teamleadname:req.body.teamleadname,
users:req.body.userid,
intername:req.user.username

}
// console.log("saving");

AdminTask.create(newTask,(err,data)=>{
if(err){
console.log(err);
}else{
console.log("taskassigned");
}
res.redirect('/showtasks');

});
});
//shows admin tasks which admin created
router.get("/admin/adiiufbibfyyagygdsigf78767iuyfuiauiufu776f9789ds7fhhuhsh",isLoggedIn,(req,res)=>{
// console.log(req);
User.find({}).then(data=>{
    console.log("adding tasks");
    
// console.log(data);
res.render("admintasks/admin_task.ejs",{data :data});
});
});

//edit the admin tasks

router.get('/editadmintasks/:id',isLoggedIn,(req,res)=>{
AdminTask.findOne({
_id:req.params.id
}).then(data=>{
if(data.id!=req.user.id){
res.redirect('/showtasks');
}else{
// console.log(data);

res.render('admintasks/editadmintasks.ejs',{data:data});
}
})
});

router.post('/editadmintasks/:id',isLoggedIn, (req,res)=>{
// console.log(req.body);
var editTask={
taskname:req.body.taskname,
description:req.body.description,
teamleadname:req.body.teamleadname,
}
// console.log(editTask)
AdminTask.updateOne({_id: req.params.id}, editTask, (err, updated) => {
if(err) throw err;
return res.redirect('/showtasks');
});
});

//delete the assigned tasks
router.get("/deleteadmintask/:id",isLoggedIn,(req,res)=>{
AdminTask.deleteOne({_id:req.params.id}).then(()=>{
res.redirect("/showtasks");
})
});


// router.get("/admin/task/:id",isLoggedIn,(req,res)=>{
//     var id=req.params.id;
//     AdminTask.findById(id).populate("comments").exec(function(err,task){
//         if(err) console.log(err);
//         else{
//             res.render('admintasks/task_details.ejs',{task:task});
//         }
//     })
// });

// router.get("/admin/task/:id/comment",isLoggedIn, function(req,res){
//     AdminTask.findById(req.params.id,function(err,task){
//         if(err) console.log(err);
//         else{
//             res.render('admintasks/new_comment.ejs',{task:task});
//         }
//     })
// });

// router.post("/admin/task/:id/comment",isLoggedIn,function(req,res){
//     AdminTask.findById(req.params.id,function(err,task){
//         if(err) console.log(err);
//         else{
//             console.log(req.body.comment);
//             var newComment={text:req.body.comment};
//             Comment.create(newComment,function(err,comment){
//                 if(err) console.log(err);
//                 else{
//                     task.comments.push(comment);
//                     task.save();
//                     res.redirect("/admin/task/"+req.params.id);
//                 }
//             })
//         }
//     })
// });

// router.get("/comment/:id/:taskid/delete",function(req,res){
//     var taskid=req.params.taskid;
//     Comment.deleteOne({_id:req.params.id},function(err,comment){
//         if(err) console.log(err);
//         else res.redirect("/admin/task/"+taskid);
//     });
// });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports=router;

