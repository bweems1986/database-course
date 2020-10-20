require("dotenv").config();
const Pool = require("pg").Pool;
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "workshopserver",
  port: 5432,
};

const pool = new Pool(config);

const getWorkshops = () => {
  return new Promise(function (resolve, reject) {
    let output = [];
    pool.query("SELECT DISTINCT workshop FROM workshops", (error, results) => {
      if (error) {
        reject(error);
      }
      
      for(const workshop of results.rows ){
        output.push(workshop.workshop);
      }
      
      resolve(output);
    });
  });
};

const getAttendees = (workshop) => {
  return new Promise(function (resolve, reject) {
    let output = [];
    let query = `SELECT attendees.id, attendees.attendee, workshop, workshop_id 
    FROM attendees 
    INNER JOIN workshops 
    ON attendees.workshop_id = workshops.id
    WHERE workshop = $1`;
    pool
      .query(query, [workshop])
      .then((results) => {
        if (results.rows.length > 0) {
          for(var i = 0; i < results.rows.length; i++){
            var row = results.rows[i];
            output.push(row.attendee);
          }
          resolve({ attendees: output });
        } else {
          resolve({ error: "workshop not found" });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};


const addAttendee = (body) => {
  let initialQuery = "SELECT * FROM workshops WHERE workshop = $1";
  let attendeeCheck = `SELECT *
    FROM attendees
    WHERE workshop_id = $1 AND attendee = $2`;
  let insertQuery = `
      INSERT INTO attendees(workshop_id, attendee)
      VALUES($1, $2)
      RETURNING id
    `;
  let insertWorkshop = "INSERT INTO workshops(workshop) VALUES ($1)";
  let insertAttendee = "INSERT INTO attendees(workshop_id, attendee) VALUES($1,$2)";
  return new Promise(function (resolve, reject) {
    const { workshop, attendee } = body; //deconstructing props into vars

    if (!attendee || !workshop) {
      resolve({ error: "parameters not given" });
    }
  
    //this first initialquery checks the workshop table first to see if we have the workshop, if we do not then we add it to the workshop table
    //and add the attendee for that workshop
    
    pool
      .query(initialQuery, [workshop])
      .then((results) => {
        if (results.rows.length < 1){
          pool
            .query(insertWorkshop, [workshop])
            .then((results) => {
              console.log("here");
              let workshopID;
              pool
                .query(initialQuery, [workshop])
                .then((results) => {
                    workshopID = results.rows[0].id;
                    pool
                      .query(attendeeCheck, [workshopID, attendee])
                      .then((results) => {
                        if(results.rows.length > 0){
                          resolve({error: "attendee already enrolled"});
                        } else {
                          pool.query(insertQuery, [workshopID, attendee])
                          .then((results) => {
                            console.log("hereee");
                            resolve({attendee: attendee, workshop: workshop});
                          })
                          .catch((err) =>{
                            reject(err);
                          });
                        }
                      })
                      .catch((err) => {
                        reject(err);
                      })
                })
                .catch((err) => {
                  reject(err);
                });

            })
            .catch((err) => {
              reject(err);
            });
        }else{
          
          let workshopID = results.rows[0].id;
          pool
            .query(attendeeCheck, [workshopID, attendee])
            .then((results) => {
              if(results.rows.length > 0){
                resolve({error: "attendee already enrolled"});
              } else {
                pool.query(insertQuery, [workshopID, attendee])
                .then((results) => {
                  console.log("hereee");
                  resolve({attendee: attendee, workshop: workshop});
                })
                .catch((err) =>{
                  reject(err);
                });
              }
            })
            .catch((err) => {
              reject(err);
            })
           
        }
      
    });
    
  });
};

module.exports = {
  getWorkshops,
  getAttendees,
  addAttendee,
};
