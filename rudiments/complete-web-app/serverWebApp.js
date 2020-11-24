require('dotenv').config()
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("port", 8080);

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const Pool = require("pg").Pool;
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "food_nutrition"
};

const pool = new Pool(config);

//HELLO WORLD
app.get("/hello", (req, res) => {
	res.json({msg: "Hello, World!"});
});

//maybe do a check here and do nothing if searchterm is nothing?
app.get('/api/index', async (req, res) => {
    let searchTerm = req.query.description;
    let upper = searchTerm.charAt(0).toUpperCase() + searchTerm.substring(1);
    console.log(`Search for ${searchTerm}`);
//%+searchTerm+% this works except returns any matching characters
    
    try {
       const template = "SELECT description, kcal, fa_sat_g, fa_mono_g, fa_poly_g FROM entries WHERE description ILIKE '"+searchTerm+"%'  LIMIT 25";
       const dbresponse = await pool.query(template);
       const results = dbresponse.rows.map((row) => {return row});
       res.json({food: results})
       console.log(results);
       
    } catch (err){
        console.log(err);
    }
})

//SERVER START
app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${app.get("port")}`);
	 // eslint-disable-line no-console
});
