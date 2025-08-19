const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient, ObjectId} = require('mongodb');

const app = express();
const PORT = 3000;

const url = 'mongodb+srv://demo:demo123@first.kke580f.mongodb.net/'
const client = new MongoClient(url);

let db, studentCollection;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

async function main(){
    try {
        await client.connect();
        db = client.db('studentDb');
        studentCollection = db.collection('students');
        console.log('Connected to MongoDB Atlas');

        app.get("/",async(req,res)=>{
            const students = await studentCollection.find().toArray();
            res.render('index', { students });
        })

        app.get("/add", (req, res) => {
            res.render('add');
        })

        app.post("/add", async (req, res) => {
            const { name, age, city, marks } = req.body;
            await studentCollection.insertOne({ name, age: parseInt(age), city, marks: parseFloat(marks) });
            res.redirect('/');
        })

        app.get("/delete/:id", async (req, res) => {
            const id = req.params.id;
            await studentCollection.deleteOne({ _id: new ObjectId(id) });
            res.redirect('/');
        })

        app.listen(PORT , ()=>{
            console.log(`Server is running on http://localhost:${PORT}`);
        })

    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

main();



// / - Table - find - send
// /add - get - form send 
// /add- post - insert data - create - redirect to home
// /delete/:id - delete - remove data - redirect to home