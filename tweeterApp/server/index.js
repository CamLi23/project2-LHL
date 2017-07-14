"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const {MongoClient}  = require("mongodb");
const url           = 'mongodb://localhost:27017/tweeter';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${url}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${url}`);

  db.collection("tweets").find({}, (err, results) => {
    // Lazy error handling:
    if (err) throw err;
  results.each((err, item) => console.log("  ", item));

    // The `data-helpers` module provides an interface to the database of tweets.
  // This simple interface layer has a big benefit: we could switch out the
  // actual database it uses and see little to no changes elsewhere in the code
  // (hint hint).
  //
  // Because it exports a function that expects the `db` as a parameter, we can
  // require it and pass the `db` parameter immediately:
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);



  // db.close();


  });

});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
