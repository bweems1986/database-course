CREATE DATABASE supersearch;

CREATE TABLE movies(
    movie TEXT NOT NULL,
    theater TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    zip INTEGER
);

INSERT INTO movies (movie, theater, address, city, zip) VALUES
('Nobody''s Watching', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('It', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('The Limehouse Golem', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('Despicable Me 3', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('Wonder Woman', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('The Emoji Movie', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('Year By The Sea', 'Marquee Cinemas Southpoint 9', '5800 South Point Centre', 'Fredericksburg',  22401),
('Rememory', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', 88005),
('Wonder Woman', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', 88005),
('Dunkirk', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', 88005),
('Anti Matter', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', 88005);

CREATE TABLE stores(
    storeid SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    zip INTEGER
);

CREATE TABLE types(
    typeid SERIAL PRIMARY KEY,
    restaurant_type TEXT NOT NULL
);

CREATE TABLE store_type (
  
  storeid INTEGER REFERENCES stores(storeid),
  typeid INTEGER REFERENCES types(typeid),
  PRIMARY KEY (storeid, typeid) 
);

INSERT INTO stores (name, address, city, zip) VALUES
('Hyperion Espresso', '301 William St.',  'Fredericksburg', 22401),
('Starbucks', '2001 Plank Road', 'Fredericksburg', 22401),
('25 30 Expresso', '400 Princess Anne St', 'Fredericksburg', 22401),
('Agora Downtown', '520 Caroline St', 'Fredericksburg', 22401),
('Highpoint Coffee', '615 Caroline St', 'Fredericksburg', 22401),
('Duck Donuts', '1223 Jefferson Davis Hwy', 'Fredericksburg', 22401),
('Basilico', '2577 Cowan Blvd', 'Fredericksburg',  22401),
('Cork and Table', '909 Caroline', 'Fredericksburg',  22401),
('Orofino', '1251 Carl D Silver Parkway', 'Fredericksburg',  22401),
('Pancho Villa Mexican Rest', '10500 Spotsylvania Ave', 'Fredericksburg', 22401),
('Chipotle', '5955 Kingstowne', 'Fredericksburg', 22401),
('Sedona Taphouse', '591 Williams', 'Fredericksburg', 22401),
('Pueblo''s Tex Mex Grill', '1320 Jefferson Davis Hwy', 'Fredericksburg', 22401),
('El Pino', '4211 Plank Road', 'Fredericksburg', 22401),
('Starbucks', '2808 Telshor Blvd', 'Las Cruces', 88005),
('Starbucks', '2511 Lohman Ave', 'Las Cruces', 88005),
('Milagro Coffee Y Espresso', '1733 E. University Ave', 'Las Cruces', 88005),
('Starbucks', '1500 South Valley',  'Las Cruces', 88005),
('Bean', '2011 Avenida De Mesilla',  'Las Cruces', 88005),
('El Comedor', '2190 Avenida De  Mesilla', 'Las Cruces', 88005),
('Los Compas', '603 S Nevarez St.',  'Las Cruces', 88005),
('La Fuente', '1710 S Espina',  'Las Cruces', 88005),
('La Posta', '2410 Calle De San Albino',  'Las Cruces', 88005),
('El Jacalito', '2215 Missouri Ave',  'Las Cruces', 88005),
('Peet''s', '2260 Locust',  'Las Cruces', 88005);

INSERT INTO types (restaurant_type) VALUES
('coffee'),
('Italian'),
('Breakfast'),
('American'),
('Mexican Restaurant'),
('donuts'),
('fast-food'),
('deli'),
('cafe');

INSERT INTO store_type (storeid, typeid) VALUES
(1,1),
(1,9),
(2,1),
(2,7),
(2,9),
(3,1),
(3,9),
(4,1),
(4,9),
(5,1),
(5,9),
(6,1),
(6,6),
(6,3),
(7,2),
(7,8),
(8,4),
(9,2),
(10,5),
(11,5),
(11,7),
(12,4),
(13,5),
(14,5),
(15,1),
(15,7),
(15,9),
(16,1),
(16,7),
(16,9),
(17,5),
(18,1),
(18,7),
(18,9),
(19,1),
(19,9),
(20,5),
(21,5),
(22,5),
(23,5),
(24,5),
(25,1);

CREATE TABLE users(
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    screenname TEXT NOT NULL,
    zipcode INTEGER
);
