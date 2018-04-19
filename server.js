const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("client/build"));

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err){
    console.log(err);
    return;
  }

  const db = client.db("our_countries_db");

app.post("/api/bucketlist",  function(req, res){
  const countriesCollection = db.collection("countries");
  const countriesToSave = req.body;
  countriesCollection.save(countriesToSave, function(err, result){
    if(err){
      console.log(err);
      res.status(500);
      res.send();
    }
    console.log("saved to DB");
    res.status(201);
    res.json(result);

  })

});


app.get("/api/bucketlist", function(req, res){
  const countriesCollection = db.collection("countries");
  countriesCollection.find().toArray(function(err, allCountries){
    if(err){
      console.log(err);
      res.status(500);
      res.send();
    }

    res.json(allCountries);

  });
});

app.delete("/api/bucketlist", function(req, res){
  const countriesCollection = db.collection("countries");
  const filterObject = {};

    countriesCollection.deleteMany(filterObject, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });

// app.put("/api/bucketlist/:id", function(req, res){
//   const countriesCollection = db.collection("countries");
//   const objectID = ObjectID(req.params.id);
//   const filterObject = { _id: objectID };
//   const updatedData = req.body;
//
//   countriesCollection.update(filterObject, updatedData,
//     function(err, result){
//       if(err){
//         console.log(err);
//         res.status(500);
//         res.send();
//       }
//       res.status(204);
//       res.send();
//   });
// });



  app.listen(3000, function(){
    console.log("Listening for requests on port 3000!");
  })
});
