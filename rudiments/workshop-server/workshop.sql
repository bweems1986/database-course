DROP DATABASE IF EXISTS workshopserver;
CREATE DATABASE workshopserver;

CREATE TABLE workshopserver (
  
  id SERIAL PRIMARY KEY,
	workshop TEXT NOT NULL,
	attendees TEXT NOT NULL
); 


INSERT INTO workshopserver (workshop, attendees)
VALUES
  ('DevOps 101', 'Brad Weems'),
  ('Docker Container Fundamentals', 'Joe Blow'),
  ('Modern Javascript', 'Jane Doe'),
  ('MongoDB', 'Peyton Manning'),
  ('React Fundamentals', 'Phil Michelson'),
  ('Self-Driving Cars', 'Les Paul'),
  ('TensorFlow', 'Ann Smith');  


    return new Promise(function (resolve, reject) {
    let output = [];
    pool
      .query("SELECT DISTINCT workshop FROM workshops")
      .then((results) => {
        if (results.rows.length > 0) {
          console.log("got here");
          output = results.rows;
          console.log(output);
          resolve({ workshops: output });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
  