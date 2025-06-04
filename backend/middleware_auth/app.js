const express = require('express');
const app = express();

//Middleware to check if user is authenticated
// const isAuthenticated = (req,res,next)=>{
//     const isAuthenticated = false;
//     if(!isAuthenticated){
//         return res.status(401).send("You are not authenticated!");
//     }
//     next();
// }

// app.get("/",(req,res)=>{
//     res.send("Welcome to the home page!");
// })

// app.get("/dashboard", isAuthenticated ,(req, res) => {
//     res.send("Welcome to the dashboard!");
// })

//multiple middlewares
const firstMiddleware = (req, res, next) => {
    console.log("First middleware executed");
    next();
}

const secondMiddleware = (req, res, next) => {
    console.log("Second middleware executed");
    next();
}


app.get("/test",firstMiddleware,secondMiddleware,(req,res)=>{
    res.send("This is a test route!");
})



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});