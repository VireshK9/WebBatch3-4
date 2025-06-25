const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookiesParser = require("cookie-parser");

const app = express();
app.use(cookiesParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(verify_jwt)
let users = [];
const SECRET_KEY = "CCA";

app.get('/', (req, res) => {
    const cookieData = req.cookies.token;
   
    console.log(cookieData)
    res.send({message:"Welcome to home page", cookieData});
})


app.post('/signup', async (req, res) => {
    const { userName, password} =req.body;

    if(!userName && !password) {
        res.send("username and password required ");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    users.push({userName, password:hashPassword});

    res.send(users);
} )

app.post('/login', async (req, res) => {
     const { userName, password} =req.body;

     if(!userName && !password) {
        res.send("username and password required");
     }

     const findUser = users.find((user)=> user.userName == userName);
     console.log(findUser);
     if(!findUser){
        res.send('User not found');
     }

     const match = await bcrypt.compare(password, findUser.password);

     if(match){
        const jwt_token  = jwt.sign({ user:findUser.userName },( SECRET_KEY ), { expiresIn:"1h" });
      
        res.cookie("token",jwt_token, {httpOnly:false});
        res.send(jwt_token);

     }
     res.send("pls check username and password");
})

app.listen(3000, () => {
    console.log("server started at port 3000");
})
