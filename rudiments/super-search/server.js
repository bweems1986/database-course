require("dotenv").config();
const argon2 = require("argon2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { json } = require("express");

const app = express();

app.set("port", 8080);

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var Pool = require("pg").Pool;
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "supersearch",
};


app.post("/login", async (req, res) => {
  console.log("LOGIN ", req.body);
  const username = req.body.username;
  const password = req.body.password;
  try {
    const query =
      "SELECT screenname,password FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);
    console.log(result);
    if (result.rowCount == 1) {
      console.log(result.rows[0].password);
      if(await argon2.verify(result.rows[0].password, password)){
        res.json({ status: "success", screenname: result.rows[0].screenname });
      } else {
        res.json({ error: "Password Incorrect" });
      }
      
    } else {      
        res.json({ error: "Username not found" });  
    }
  } catch (err) {
    console.log("ERROR " + err);
  }
});

app.post("/create", async (req, res) => {
  let hash;
  const username = req.body.username;
  const password = req.body.password;
  const screenname = req.body.screenname;
  const zipcode = req.body.zipcode;
  try {
    hash = await argon2.hash(password);
    console.log("HASH" + hash);
    const query =
      "INSERT INTO users (username, password, screenname, zipcode) VALUES ($1, $2, $3, $4)";
    const result = await pool.query(query, [username, hash, screenname, zipcode]);
    //console.log(result);
    if (result.rowCount == 1) {
      console.log(screenname);
      res.json({ status: "success", screenname: screenname });
    } else {
      res.json({ error: "User not created" });
    }
  } catch (err) {
    console.log("ERROR " + err);
    if (err.message.search("duplicate") != -1) {
      res.json({ error: "Username taken" });
    }
  }
});

app.get('/search', async (req, res) => {
  let searchTerm = req.query.name;
  let userName = req.query.screenname;
  let searchResults = [];
  let zipResults = '';

  console.log(`Search for ${searchTerm}, ${userName}`);
//get logged in user zip if there is one

if(userName !== undefined){
  try {
    console.log("hereee");
    const template = "select zipcode from users where users.screenname = '"+userName+"'";
    console.log(userName);
    const dbresponse = await pool.query(template);
    const results = dbresponse.rows.map((row) => {return row});
    console.log(results + "username check");
    if(results.length > 0){
      zipResults = results[0].zipcode;
    }
  } catch (err){
  console.log(err);
  }
}


//this if block will have all queries for a logged in user
if(zipResults.length > 0){
//search all movies
  if(searchTerm !== "movies"){
    try{
      //search by type
      const template = "select name, restaurant_type, address, city, zip from stores inner join store_type on store_type.storeid = stores.storeid inner join types on types.typeid = store_type.typeid where position(LOWER('"+searchTerm+"') IN lower(types.restaurant_type)) > 0 and stores.zip = '"+zipResults+"'";
      const dbresponse = await pool.query(template);
      const results = dbresponse.rows.map((row) => {return row});
      console.log(results);

      if(results.length > 0){
       res.json({
        movie_name: [],
        restaurant_type: results,
        restaurant_name: [],
        theater_name: []
        })
    }else{
      try{
        //search by restaurant name
        const template = "select name, restaurant_type, address, city, zip from stores inner join store_type on store_type.storeid = stores.storeid inner join types on types.typeid = store_type.typeid where position(LOWER('"+searchTerm+"') IN lower(stores.name)) > 0 and stores.zip = '"+zipResults+"'";
        const dbresponse = await pool.query(template);
        const results = dbresponse.rows.map((row) => {return row});

          if(results.length > 0){
            res.json({
            movie_name: [],
            restaurant_type: [],
            restaurant_name: results,
            theater_name: []
          })
        }else{
          try{
            //search by movie name
            const template = "SELECT movie,theater,address,city,zip from movies,users WHERE position(LOWER('"+searchTerm+"') IN lower(movies.movie)) > 0 and movies.zip = '"+zipResults+"'";
            const dbresponse = await pool.query(template);
            const results = dbresponse.rows.map((row) => {return row});
      
            if(results.length > 0){
              res.json({
              movie_name: results,
              restaurant_type: [],
              restaurant_name: [],
              theater_name: []
            })
          }else{
            try{

              //search by theater name
              const template = "SELECT * from movies WHERE position(LOWER('"+searchTerm+"') IN lower(movies.theater)) > 0 and movies.zip = '"+zipResults+"'";
              const dbresponse = await pool.query(template);
              const results = dbresponse.rows.map((row) => {return row});

              if(results.length > 0){
                res.json({
                movie_name: [],
                restaurant_type: [],
                restaurant_name: [],
                theater_name: results
              })
            }
            } catch (err){
              console.log(err);
            }
          }
          } catch(err){
            console.log(err);
          }
        }
        } catch (err){
          console.log(err);
        }

    }
    } catch (err){
      console.log(err);
    }
  }else{
      try{
        const template = "select movie, theater, address, city, zip from movies where movies.zip = '"+zipResults+"'";
        const dbresponse = await pool.query(template);
        const results = dbresponse.rows.map((row) => {return row});

        if(results.length > 0){
          res.json({
          movie_name: results,
          restaurant_type: [],
          restaurant_name: [],
          theater_name: []
          })
        }
      } catch(err){
        console.log(err);
      }
      

    }

}


//this if block has all queries for a non-logged in user
if(zipResults.length === 0){
  //search all movies
  if(searchTerm !== "movies"){
    ////////////////////////
        //search by type
        try {
          const template = "select name, restaurant_type, address, city, zip from stores inner join store_type on store_type.storeid = stores.storeid inner join types on types.typeid = store_type.typeid where position(LOWER('"+searchTerm+"') IN lower(types.restaurant_type)) > 0";
          const dbresponse = await pool.query(template);
          const results = dbresponse.rows.map((row) => {return row});
          console.log(results + "type");
    
          if(results.length > 0){
            res.json({
            movie_name: [],
            restaurant_type: results,
            restaurant_name: [],
            theater_name: []
          })
        }else{
          //search by restaurant name
          try {
            const template = "select name, restaurant_type, address, city, zip from stores inner join store_type on store_type.storeid = stores.storeid inner join types on types.typeid = store_type.typeid where position(LOWER('"+searchTerm+"') IN lower(stores.name)) > 0 ";
            const dbresponse = await pool.query(template);
            const results = dbresponse.rows.map((row) => {return row});
            console.log(results + "res name");

                if(results.length > 0){
                  res.json({
                  movie_name: [],
                  restaurant_type: [],
                  restaurant_name: results,
                  theater_name: []
                })
              }else{
                //search by movie name
                try {
                  const template = "SELECT * from movies WHERE position(LOWER('"+searchTerm+"') IN lower(movies.movie)) > 0";
                  const dbresponse = await pool.query(template);
                  const results = dbresponse.rows.map((row) => {return row});
                  console.log(results + "movie name");

                  if(results.length > 0){
                    res.json({
                    movie_name: results,
                    restaurant_type: [],
                    restaurant_name: [],
                    theater_name: []
                  })
                }else{
                  //search by theater name
                  try {
                    const template = "SELECT * from movies WHERE position(LOWER('"+searchTerm+"') IN lower(movies.theater)) > 0";
                    const dbresponse = await pool.query(template);
                    const results = dbresponse.rows.map((row) => {return row});
                    console.log(results + "theater name");

                    if(results.length > 0){
                      res.json({
                      movie_name: [],
                      restaurant_type: [],
                      restaurant_name: [],
                      theater_name: results
                    })
                  }
                  }
                
                    catch (err){
                      console.log(err);
                    }

                }
                }
                  catch (err){
                    console.log(err);
                  }

              }
              }
              catch (err){
                console.log(err);
            }

        }
        } catch (err){
          console.log(err);
      }
    ////////////////
    
      }else{
        try {
          const template = "select movie, theater, address, city, zip from movies";
          const dbresponse = await pool.query(template);
          const results = dbresponse.rows.map((row) => {return row});
          console.log(results + "all movies");

          if(results.length > 0){
          res.json({
            movie_name: results,
            restaurant_type: [],
            restaurant_name: [],
            theater_name: []
          })
        

      }
      } catch (err){
      console.log(err);
  }

  }

}

}); 

    


var pool = new Pool(config);

app.get("/hello", (req, res) => {
  res.json("Hello World!");
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at http://localhost:${app.get("port")}/`);
});


