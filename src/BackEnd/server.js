const express = require('express')
const app = express()
const port = 4000

const cors = require('cors');
const bodyParser = require('body-parser');

// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
//parse application/json
app.use(bodyParser.json())


app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.9ahdap6.mongodb.net/?retryWrites=true&w=majority');
  
  //await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}


const bookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    author: String
  });

  const bookModel = mongoose.model(` My Books`, bookSchema);

app.post('/api/books',(req, res)=>{
    console.log(req.body);

    bookModel.create({
        title:req.body.title,
        cover:req.body.cover,
        author:req.body.author
    })

    res.send('Data Received');
})
app.get('/api/books',(req, res)=>{
    bookModel.find((error, data)=>{
        res.json(data);
    })   
  
})
app.get('/api/book/:id',(req, res)=>{
    console.log(req.params.id);

    bookModel.findById(req.params.id,(error, data)=>{
        res.json(data);

    })

    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})