var express = require("express");
var router = express.Router();
var secret = require("../models/secret");


router.get("/secret", (req, res) =>{
    res.render("secret/secret.ejs");
});

router.post("/secret", (req, res) => {
    var data = {
        username: req.body.username,
        password: req.body.password
    }

    secret.create(data, (err, data) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/stable');
        }   
        


    })
    // console.log(req.body);
    
})

router.get("/stable", (req, res) => {
    // res.render("secret/stable.ejs",
        secret.find({}, (err, data) => {
            if(err){
                console.log(err);
            } else {
                res.render("secret/stable.ejs", {
                    data: data
                })
            }
        })
});

router.get("/secretedit/:id", (req, res) =>{
    secret.findOne({ _id: req.params.id }, (err, data) => {
        if(err){
            console.log(err);
        } else {
            // console.log(data);
            
            res.render("secret/editform.ejs", { data: data });
        }
        
    })
        
})

router.post("/secretedit/:id", (req, res) => {
    console.log(req.params);
    var data={
        username:req.body.username,
        password:req.body.password
    }
    secret.updateOne({_id:req.params.id},data,(err,data1)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/stable');
        }
    })
});

router.get("/secretdelete/:id", (req, res) => {
   secret.deleteOne({
       _id: req.params.id
   }).then(()=>{
       res.redirect('/stable');
   })
});

module.exports = router;