create database core_competency;

create table restaurant (
    restaurantid serial primary key,
    name text not null,
    city text not null,
    state text not null,
    type text not null,
    zip varchar(10),
    dollars varchar(10)
);

create table type (
    typeid serial primary key,
    type text not null
);

create table review (
    restaurant_name text not null,
    zip varchar(10),
    reviewer text not null,
    rating integer,
    review text not null
);

create table restaurant_type (
  
  restaurantid INTEGER REFERENCES restaurant(restaurantid),
  typeid INTEGER REFERENCES type(typeid),
  PRIMARY KEY (restaurantid, typeid) 
);
