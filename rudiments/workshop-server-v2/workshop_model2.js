require("dotenv").config();
const Pool = require("pg").Pool;
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "workshopserver2",
  port: 5432,
};

const pool = new Pool(config);


const enroll = (body) => {
    let enrollmentWorkshopCheck = `SELECT (enrollments.workshop_id, enrollments.user_id)
    FROM enrollments
    INNER JOIN workshops 
    ON enrollments.workshop_id = workshops.workshop_id
    INNER JOIN users
    ON enrollments.user_id = users.user_id
    WHERE title = $1 
    AND date = $2 
    AND location = $3
    AND username = $4`;
    let enrollAttendee = `INSERT INTO enrollments (workshop_id, user_id)
    SELECT workshops.workshop_id, users.user_id
    FROM workshops, users
    WHERE title = $1
    AND date = $2
    AND location = $3
    AND username = $4`;
    let usernameCheck = "SELECT * FROM users WHERE username = $1";
    let workShopCheck = "SELECT title, date, location FROM workshops WHERE title = $1 AND date = $2 AND location = $3";
    let checkSeats = `SELECT enrollments.workshop_id
    FROM enrollments
    INNER JOIN workshops 
    ON enrollments.workshop_id = workshops.workshop_id
    WHERE title = $1
    AND date = $2
    AND location = $3`;
  
    return new Promise(function (resolve, reject) {
  
      const {title, date, location, maxseats, instructor, username} = body;
  
      pool
        .query(usernameCheck,[username])
        .then((results) => {
          if(results.rows.length < 1){
            resolve({status: "username not in database"});
          }
        })
        .catch((err) => {
          reject(err);
        });
  
      pool
        .query(workShopCheck, [title, date, location])
        .then((results) => {
          if(results.rows.length < 1){
            resolve({status: "workshop does not exist"});
          }
        })
        .catch((err) => {
          reject(err);
        });
  
      pool
        .query(enrollmentWorkshopCheck, [title, date, location, username])
        .then((results) => {
          if(results.rows.length > 0){
            resolve({status: "user already enrolled"});
          }
        })
        .catch((err) => {
          reject(err);
        });
  
      pool
        .query(checkSeats, [title, date, location])
        .then((results) => {
          if(results.rows.length >= maxseats){
            console.log(maxseats);
            resolve({status: "no seats available"});
          }else {
            pool
              .query(enrollAttendee, [title, date, location, username])
              .then((results) => {
                if(results.rows.length < 1){
                resolve({status: "user added"});
                }
              })
              .catch((err) => {
                reject(err);
              });
  
          }
        })
        .catch((err) => {
          reject(err);
        });
    });  
  };
  
  
  
  const addWorkshop = (body) => {
    let insertWorkshop = "INSERT into workshops(title, date, location, maxseats, instructor) VALUES($1,$2,$3,$4,$5)";
    let workShopCheck = "SELECT title, date, location FROM workshops WHERE title = $1 AND date = $2 AND location = $3";
  
    return new Promise(function (resolve, reject) {
      const {title, date, location, maxseats, instructor} = body;
  
      pool  
        .query(workShopCheck, [title, date, location])
        .then((results) => {
          console.log(results);
          if(results.rows.length < 1){
            pool
            .query(insertWorkshop, [title, date, location, maxseats, instructor])
            .then((results) => {
              resolve({status: "workshop added"});
            })
            .catch((err) => {
              reject(err);
            })
          }else{
            resolve({status: "workshop already in database"});
          }
        })
        .catch((err) => {
          reject(err);
        });
    })
  }
  
  const createUser = (body) => {
    let insertUser = "INSERT into users(username, firstname, lastname, email) VALUES ($1,$2,$3,$4)";
    let userCheck = `SELECT *
      FROM users
      WHERE username = $1`;
  
    return new Promise(function (resolve, reject) {
      const { username, firstname, lastname, email } = body; //deconstructing props into vars
  
      if (!username || !firstname || !lastname) {
        resolve({ error: "parameters not given" });
      }
  
      pool
        .query(userCheck, [username])
        .then((results) => {
          if(results.rows.length > 0){
            resolve({status: "username taken"});
          }else{
            pool
              .query(insertUser, [username, firstname, lastname, email])
              .then((results) => {
                resolve({status: "user added"});
              })
              .catch((err) => {
                reject(err);
              });
  
          }
  
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  
  
  
  const deleteUser = (body) => {
    let removeUser = "DELETE FROM users WHERE username = $1";
  
    return new Promise(function (resolve, reject) {
  
      const {username} = body;
  
      if(!username){
        resolve({status: "username not given"});
      }
      pool
        .query(removeUser, [username])
        .then((results) => {
          resolve({status: "deleted"});
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  const verboseUsers = () => {
  
    let output = [];
    return new Promise(function (resolve, reject) {
      pool.query("SELECT username, firstname, lastname, email FROM users", (error, results) => {
        if (error) {
          reject(error);
        }
        
        for(const user of results.rows ){
          output.push(user.username, user.firstname, user.lastname, user.email);
          console.log(results);
        }
        for(var i = 0; i < results.rows.length; i++){
        resolve({users: results.rows});
        }
      });
    });
  }
    
  const sumUsers = () => {
    let output = [];
    return new Promise(function (resolve, reject) {
      pool.query("SELECT firstname, lastname FROM users", (error, results) => {
        if (error) {
          reject(error);
        }
        
        for(const user of results.rows ){
          output.push(user.username, user.firstname, user.lastname, user.email);
        }
        for(var i = 0; i < results.rows.length; i++){
        resolve({users: results.rows});
        }
      });
    });
  }
  
  const listWorkshops = () => {
    let output = [];
    var dateFormat = require('dateformat');
    return new Promise(function (resolve, reject) {
      pool.query("SELECT title, date, location FROM workshops", (error, results) => {
        if (error) {
          reject(error);
        }
        
        for(const workshop of results.rows){
          workshop.date = dateFormat(workshop.date, "yyyy-mm-dd");
          output.push(workshop.title, workshop.date, workshop.location);
        }
        for(var i = 0; i < results.rows.length; i++){
        resolve({workshops: results.rows});
        }
      });
    });
  };
  
  const getEnrollments = (title,date,location) => {
  let workshopAttendees = `SELECT users.firstname, users.lastname
  FROM workshops
  INNER JOIN enrollments 
  ON workshops.workshop_id = enrollments.workshop_id
  INNER JOIN users
  ON users.user_id = enrollments.user_id
  WHERE title = $1 
  AND date = $2 
  AND location = $3`;
  let workShopCheck = "SELECT title, date, location FROM workshops WHERE title = $1 AND date = $2 AND location = $3";
  let output = [];
  
    return new Promise(function (resolve, reject) {
  
      pool
        .query(workShopCheck, [title, date, location])
        .then((results) => {
          console.log(results);
          if(results.rows.length < 1){
            resolve({error: "workshop does not exist"});
          }
        })
        .catch((err) => {
          reject(err);
        });
  
      pool
        .query(workshopAttendees, [title, date, location])
        .then((results) => {
          resolve({attendees: results.rows})
        })
        .catch((err) => {
          reject(err);
        });
  
    });
  };
  
  
  
  module.exports = {
    createUser,
    deleteUser,
    verboseUsers,
    sumUsers,
    addWorkshop,
    listWorkshops,
    getEnrollments,
    enroll,
  };
  