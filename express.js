
var express = require("express");
var path = require("path");
var fs = require("fs");

var cors = require("cors");
var { MongoClient } = require("mongodb");


var app = express();

const uri = "mongodb+srv://philipgriffin03_db_user:6w%C2%A3pW%29m13%253f@cluster0.rfwrbbl.mongodb.net/"
const dbname = "Webstore";

let db;

app.use(cors());//allows frontend to call api
app.use(express.json());//parses requests as json

app.use(function(req, res, next) {//use in code
    console.log("Request IP: " + req.url);
    console.log("Request date: " + new Date());
    next();
});


app.use("/img", function(req, res, next) {
    var filePath = path.join(__dirname, "img", req.url);
    fs.stat(filePath, function(err, fileInfo) {
    if (err) {
        next();
        return;
    }
    if (fileInfo.isFile()) {
        res.sendFile(filePath);
    } else {
        next();
    }
    });
});


MongoClient.connect(uri)
    .then(client => {
        console.log("Connected to mongodb");
        db = client.db(dbname);
    })
    .catch(err => {
        console.error("Failed to connect to Mongodb");
    })









app.get("/lessons", async (req, res) => {
    try {
        const lessons = await db.collection("Lessons").find({}).toArray();
        res.json(lessons);
    } catch (err) {
        console.error("Error fetching lessons:", err);
        res.status(500).json({ error: "Failed to fetch lessons" });
    }
});




app.post("/checkout", function(req, res){

});

app.put("/lessons", function(req, res){

});






app.use(function(req, res) {//change around
    res.status(404);
    res.send("File not found!");
});











const port = process.env.PORT || 3000;
app.listen(port, function() {
 console.log("App started on port: " + port);
});