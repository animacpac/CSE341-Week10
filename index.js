const { response } = require("express");
var express = require("express");
var app = express();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool ({connectionString: connectionString});

app.set("port", (process.env.PORT || 8080))

app.get("/", getMovie)

app.listen(app.get("port"), function(){
    console.log("listening for connection on port: ", app.get("port"));

});

function getMovie(req, res){

    console.log("Getting Movie information.");

    var id = req.query.id;

    console.log("getting the ID: ", id);

    getMovieFromDb(id, function(error, result){

      if (error || result == null || result.lenght != 1) {
        response.status(500).json({sucess:false, data: error});
      }
      else{
        res.json(result);
      }
      console.log("Back from database with result: ",result);
      res.json(result);

    });

   
}

function getMovieFromDb(id, callback) {
  console.log("getMovieFromDb called with id: ", id);

  var sql = "SELECT id, movie_name, description FROM movies WHERE id = $1::int";
  var params = [id];

  pool.query(sql, params, function(err, result){

    if(err){
      console.log("An eror with the DB occured");
      console.log(err);
      callback(err, null);
    }
    console.log("Found DB result: " + JSON.stringify(result.rows));

    callback(null, result.rows);
  });
}