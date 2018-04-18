const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("client/build"));

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err){
    console.log(err);
    return;
  }

  const db = client.db("our_countries_db");


  app.get("/api/bucketlist", function(req, res){
    res.json("ok");
  })


  app.listen(3000, function(){
    console.log("Listening for requests on port 3000!");
  })
});
