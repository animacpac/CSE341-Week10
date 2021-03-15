const { response } = require("express");
var express = require("express");
var app = express();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool ({connectionString: connectionString});

Pool.connect()
.then(() => Pool.query("insert into movies value ($1, $2, $3)", [1000, 'testing', 'addres desic']))
.then(() => Pool.query("select * from movies"))
.then (result => console.table(result.rows))
.catch(e => Pool.log(e))
.then (()=> Pool.end())
