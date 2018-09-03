const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");
const bodyParser = require('body-parser')

const createTable = (req, res) => {
  if (req.method == "POST") {
    db.serialize(function() {
      var query = req.body.query;
      db.run(query, err => {
        if (err) {
          res.status(500).json({
            success: false,
            message: err
          });
        }
        res.status(200).json({
          success: true,
          message: "Table added successfully"
        });
      });
    });
  }
};

const fetchQuery = (req, res) => {
  db.serialize(function() {
    var query = req.query.query;
    var stmt = db.prepare(query);
    console.log(req.body);
    for(let i=0;i<Object.keys(req.body).length;i+=1){
      console.log(req.body[`${i}`]);
    }
    stmt.finalize();
  });
};
var app = express();
app.use(cors());
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use("/createTable", createTable);
app.use("/fetch", fetchQuery);
app.listen(4000, () =>
  console.log("Express Sqlite Server Now Running On localhost:4000")
);
