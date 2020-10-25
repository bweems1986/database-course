DROP DATABASE IF EXISTS workshopserver;
CREATE DATABASE workshopserver;

CREATE TABLE workshops (
  
  id SERIAL PRIMARY KEY,
	workshop TEXT NOT NULL
); 


INSERT INTO workshops (workshop, attendees)
VALUES
  ('DevOps 101', 'Brad Weems'),
  ('Docker Container Fundamentals', 'Joe Blow'),
  ('Modern Javascript', 'Jane Doe'),
  ('MongoDB', 'Peyton Manning'),
  ('React Fundamentals', 'Phil Michelson'),
  ('Self-Driving Cars', 'Les Paul'),
  ('TensorFlow', 'Ann Smith');  


CREATE TABLE attendees (
  
  id SERIAL PRIMARY KEY,
	workshop_id INTEGER NOT NULL,
	attendee TEXT NOT NULL
); 


CREATE DATABASE workshopserver2;

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
    username TEXT NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL
);

 
CREATE TABLE attendees (
  
  workshop_id INTEGER REFERENCES workshops(workshop_id),
  user_id INTEGER REFERENCES users(user_id),
  PRIMARY KEY (workshop_id, user_id) 
); 