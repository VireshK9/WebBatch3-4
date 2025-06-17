const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/index.html')
});

app.post("/calculator", async (req, res) => {
    const num1 = parseInt( req.body.num1);
    const num2 = parseInt(req.body.num2);
    const { num1, num2, operation }= req.body;
    

    let add = num1 + num2;

    res.send(`addition of two no ${add}`);
});


app.listen(port,()=>{
    console.log("server started on port 3000");
})