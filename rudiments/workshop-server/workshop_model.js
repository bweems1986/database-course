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
      output = results.rows;
      resolve(output);
    });
  });
};

const getAttendees = (workshop) => {
  return new Promise(function (resolve, reject) {
    let output = [];
    pool
      .query("SELECT * FROM workshops WHERE workshop = $1", [workshop])
      .then((results) => {
        if (results.rows.length > 0) {
          output = results.rows[0].attendees.split(",");
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
  return new Promise(function (resolve, reject) {
    const { workshop, attendee } = body;
    if (!attendee || !workshop) {
      resolve({ error: "parameters not given" });
    }
    let columnData;
    let columnDataString;
    //get existing data
    pool
      .query("SELECT * FROM workshops WHERE workshop = $1", [workshop])
      .then((results) => {
        if (results.rows.length > 0) {
          columnData = results.rows[0].attendees.split(",");
          if (columnData.join(",").indexOf(attendee) > -1) {
            resolve({ error: "attendee already enrolled" });
          } else {
            //add new guy
            columnData.push(attendee);
            columnDataString = columnData.join(",");
            pool
              .query(
                "UPDATE workshops SET attendees = $1 WHERE workshop = $2",
                [columnDataString, workshop]
              )
              .then(() => {
                resolve({
                  attendee: attendee,
                  workshop: workshop,
                });
              })
              .catch((error) => {
                reject(error);
              });
          }
        } else {
          resolve({ error: "workshop not found" });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  getWorkshops,
  getAttendees,
  addAttendee,
};
