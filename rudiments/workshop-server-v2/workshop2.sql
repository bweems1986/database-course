CREATE DATABASE workshopserver;

CREATE TABLE workshops (
  
  workshop_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date date,
  location TEXT NOT NULL,
  maxSeats INTEGER,
  instructor TEXT NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT,
    firstname TEXT,
    lastname TEXT,
    email TEXT 
);

 
CREATE TABLE enrollments (
  
  workshop_id INTEGER REFERENCES workshops(workshop_id),
  user_id INTEGER REFERENCES users(user_id),
  PRIMARY KEY (workshop_id, user_id) 
); 