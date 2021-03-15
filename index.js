const { response } = require("express");
var express = require("express");
var app = express();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool ({connectionString: connectionString});

app.set("port", (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get("/getRestaurant",getRestaurant)

app.listen(app.get("port"), function(){
    console.log("listening for connection on port: ", app.get("port"));

});
app.get('/', function(request, response) {
  response.render('pages/index');
});

function getRestaurant(req, res){

    console.log("Getting Movie information.");

    var id = req.query.id;

    console.log("getting the ID: ", id);

    getRestaurantFromDb(id, function(error, result){

      if (error || result == null || result.lenght != 1) {
        res.status(500).json({sucess:false, data: error});
      }
      else{
        res.json(result[0]);
      }
     

    });

}

function getRestaurantFromDb(id, callback) {
  console.log("getRestaurantFromDb called with id: ", id);
  var client = new pg.Client(connectionString);

  var rName = rName['']
  var sql = "SELECT * FROM movies WHERE restaurant = ['restaurant']";
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