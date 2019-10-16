create database gasprices;

\c gasprices;

create table stations (
  stationid serial primary key,
  stationname varchar(50),
  stationstreetaddress varchar(255),
  stationcity varchar(50),
  stationstate varchar(2),
  stationzip int CHECK (stationzip > 9999) CHECK (stationzip < 100000),
  needmembership bit default(cast(0 as bit)),
  latitude numeric(11, 7),
  longitude numeric(11, 7),
  placeid varchar(30) UNIQUE
);

create table octanes (
  octaneid serial primary key,
  octanename varchar(15)
);

insert into octanes (octanename) values ('Regular');
insert into octanes (octanename) values ('Mid-Grade');
insert into octanes (octanename) values ('Premium');
insert into octanes (octanename) values ('Diesel');

create table prices (
  priceid serial primary key,
  price numeric(3, 2),
  stationid int references stations(stationid),
  reporttime timestamp,
  octaneid int references octanes(octaneid),
  userid int references users(userid),
  flagged bit default(cast(0 as bit))
);

create index stationidpricesindex on prices(stationid);
create index octaneidpricesindex on prices(octaneid);

create table users (
  userid serial primary key,
  username varchar(50),
  pwhash varchar(64)
);

create table reviews (
  reviewid serial primary key,
  stationid int references stations(stationid),
  reviewerid int references users(userid),
  reviewtime timestamp,
  reviewrating int CHECK (reviewrating > 0) CHECK (reviewrating < 6),
  reviewdescription varchar(2000),
  flagged bit default(cast(0 as bit))
);

create index stationidreviewsindex on reviews(stationid);
create index revieweridreviewsindex on reviews(reviewerid);
