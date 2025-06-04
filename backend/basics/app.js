const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/add",function(req,res){
    const n1 = Number(req.body.num1);
    const n2 = Number(req.body.num2);
    const result = n1 + n2;
    res.send("The addition is " + result);
})

app.get("/user/:id/:pass",function(req,res){
    res.send("User ID is " + req.params.id + " and Password is " + req.params.pass);
})

// http://localhost:3000/user/67/3454
// User ID is 67 and Password is 3454

app.listen(3000,function(){
    console.log("Server is running on port 3000")
})