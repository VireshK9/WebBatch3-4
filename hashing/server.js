const express = require("express")
const bcrypt = require("bcryptjs")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const users = []

app.get("/signup/:username/:password",async(req,res)=>{
    const {username,password} = req.params;

    const existingUser = users.find(user => user.username === username);

    if(existingUser) return res.json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    console.log(users);
    console.log(hashedPassword)

    res.json({message:"User registered successfully!"})
})

app.get("/login/:username/:password", async (req, res) => {
    const {username,password} = req.params;

    const user = users.find(user => user.username === username);
    if(!user) return res.json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return res.json({ message: "Invalid password" });

    res.json({ message: "Login successful", user: { username: user.username } });
})


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
})