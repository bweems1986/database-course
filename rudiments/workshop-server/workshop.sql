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


