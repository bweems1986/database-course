require("dotenv").config();
const Pool = require("pg").Pool;
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "core_competency",
  port: 5432,
};

const pool = new Pool(config);







  
        
    

const addRestaurant = (body) => {
  let insertRestaurant = "INSERT into restaurant(restaurant, city, state, zip, type, dollars) VALUES ($1,$2,$3,$4,$5,$6)";
  

  return new Promise(function (resolve, reject) {
    const { name, city, state, zip, type, dollars } = body; //deconstructing props into vars


          pool
            .query(insertRestaurant, [name, city, state, zip, type, dollars])
            .then((results) => {
              resolve({status: "OK"});
            })
            .catch((err) => {
              reject(err);
            });

        

      
      
  });
};

const addReview = (body) => {
  let insertReview = "INSERT into review(name, zip, reviewer, stars, review, review_date ) VALUES ($1,$2,$3,$4,$5,$6)";


  return new Promise(function (resolve, reject) {
    var date  = new Date();

    const { name, zip, reviewer, rating, review} = body; //deconstructing props into vars


          pool
            .query(insertReview, [name, zip, reviewer, rating, review, new Date() ])
            .then((results) => {
              resolve({status: "OK"});
            })
            .catch((err) => {
              reject(err);
            });    
  });
};

const getReview = (name, zip) => {
    let reviews = "select reviewer, review_date, stars, review from review where name = $1 and zip = $2 order by stars desc";
    return new Promise(function (resolve, reject) {
      pool
        .query(reviews, [name, zip])
        .then((results) => {
          resolve({status: "OK",
        result: results.rows });
        })
        .catch((err) => {
          reject(err);
        
      });
    });
  };
 

 
  const getType = (type) => {
    let reviews = "select restaurant.restaurant,stars as rating, count(stars) as reviews,dollars,city,state,restaurant.zip from restaurant inner join review on review.zip = restaurant.zip where position(LOWER($1) IN lower(restaurant.type)) > 0 group by restaurant.restaurant, review.stars, restaurant.dollars, restaurant.city, restaurant.state, restaurant.zip" ;
    var dateFormat = require('dateformat');
    return new Promise(function (resolve, reject) {
      pool
        .query(reviews, [type])
        .then((results) => {

          resolve({status: "OK",
          result: results.rows});
        })
        .catch((err) => {
          reject(err);
        
      });
    });
  };

  const getRestaurant = (name, zip) => {
    let reviews = `select distinct restaurant.restaurant as name,city,state,restaurant.zip, dollars, avg(review.stars) as stars, 
    count(review) as reviews from review 
    inner join restaurant on restaurant.zip = review.zip where position(LOWER('$1') IN lower(review.name)) > 0
    and restaurant.zip = '$2'
    group by restaurant.restaurant, review.stars, restaurant.dollars, restaurant.city, restaurant.state, restaurant.zip, review.review`;
    var dateFormat = require('dateformat');
    return new Promise(function (resolve, reject) {
      pool
        .query(reviews, [name, zip])
        .then((results) => {

          resolve({status: "OK",
          result: results.rows});
        })
        .catch((err) => {
          reject(err);
        
      });
    });
  };


  
  








module.exports = {
  
  addRestaurant,
  addReview,
  getReview,
  getType,
  getRestaurant
  
};
