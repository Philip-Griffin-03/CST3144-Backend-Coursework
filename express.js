var express = require("express");
var path = require("path");
var fs = require("fs");


var app = express();

const uri = "mongodb+srv://philipgriffin03_db_user:<6w£pW)m13%3f>@cluster0.rfwrbbl.mongodb.net/"


app.use(function(req, res, next) {//use in code
    console.log("Request IP: " + req.url);
    console.log("Request date: " + new Date());
    next();
});
app.use(function(req, res, next) {
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
app.use(function(req, res) {
    res.status(404);
    res.send("File not found!");
});


app.get("/lessons", function(req, res){

});

app.post("/checkout", function(req, res){

});

app.put("/lessons", function(req, res){

});





















const port = process.env.PORT || 3000;
app.listen(port, function() {
 console.log("App started on port: " + port);
});