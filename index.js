const express = require('express');
const app = express();
const ejsmate = require("ejs-mate");

app.engine('ejs', ejsmate);
app.set("view engine", "ejs");
app.set("views", (__dirname+"/views"))

app.use(express.static(__dirname+"/public"));

app.get('/', (req,res) => {
    res.render('index');
})


app.listen("4200", () => {
    console.log("Listening to 4200");
})