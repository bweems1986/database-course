DROP DATABASE IF EXISTS workshopserver;
CREATE DATABASE workshopserver;

CREATE TABLE workshopserver (
  
  id SERIAL PRIMARY KEY,
	workshop TEXT NOT NULL,
	attendee TEXT NOT NULL
); 


INSERT INTO workshopserver (workshop, attendee)
VALUES
  ('DevOps 101', 'Brad Weems'),
  ('Docker Container Fundamentals', 'Joe Blow'),
  ('Modern Javascript', 'Jane Doe'),
  ('MongoDB', 'Peyton Manning'),
  ('React Fundamentals', 'Phil Michelson'),
  ('Self-Driving Cars', 'Les Paul'),
  ('Tensor Flow', 'Ann Smith'),
  ('Deep Learning', 'Kevin Smith');  
  