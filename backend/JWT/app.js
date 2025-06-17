
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [];
const JWT_SECRET = 'CCA'; // Replace with your secret key
const generatedToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pa2hpbCIsImlhdCI6MTc1MDA3ODYyOSwiZXhwIjoxNzUwMDgyMjI5fQ.PZFaI-rgsv_C3MYn74meamkA2H8pwTyNNWe63AaZ8fk"



const jwtVerify = () => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

     
        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }

       const verifyJwt=  jwt.verify(token, JWT_SECRET,);

        if(!verifyJwt){
            return res.status(401).send('Invalid token');
        }
            req.user = verifyJwt;
            next();
        
    };
}

app.get('/', (req,res)=>{
    res.send('Welcome to home page ...')
})


app.post('/signup', async (req, res)=>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).send('Username and password are required');
    }

const hashedPassword = await bcrypt.hash(password, 10);

// const userExists = users.find(user => user.username === username);
//     if (userExists) {
//         return res.status(400).send('User already exists');
//     }

    users.push({ username, password: hashedPassword });


    res.send('User registered successfully');   
})


app.post('/login', async (req, res)=>{
    console.log("hello")
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).send('Username and password are required');
    }

    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(400).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send('Invalid password');
    }
    if(isPasswordValid){
        const token = jwt.sign(
            { username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        )
        console.log(token);
       return  res.json({ token });
    }
    
})


app.get('/dashboard', jwtVerify(), (req, res) => {
    const user = req.user;

    const role = user.role 
    if(role !== 'admin'){
        return res.status(403).send('Access denied');
    }
    console.log(user);
    res.send('Welcome to the dashboard');
}
);  

app.listen(3000,()=>{
    console.log('server started on port 3000')
})