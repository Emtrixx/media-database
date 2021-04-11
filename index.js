if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const ejsmate = require("ejs-mate");
const mongoose = require('mongoose');

app.engine('ejs', ejsmate);
app.set("view engine", "ejs");
app.set("views", (__dirname+"/views"))

app.use(express.static(__dirname+"/public"));

const dbUrl = "mongodb://localhost:27017/media-db" || process.env.DB_URL 
mongoose.connect(dbUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log("Connected to mongodb");
    }).catch(() => {
        console.log("ERROR - Could not connect to mongodb");
    })

app.get('/', (req,res) => {
    res.render('home');
})

app.get('/movies', (req,res) => {
    res.render('movies/index')
})


app.listen("4200", () => {
    console.log("Listening to 4200");
})