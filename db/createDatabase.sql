create database gasprices;

\c gasprices;

create table gasstations (
  stationid serial primary key,
  stationname varchar(50),
  stationstreetaddress varchar(255),
  stationcity varchar(50),
  stationstate varchar(2),
  stationzip int CHECK (stationzip > 9999) CHECK (stationzip < 100000),
  needmembership bit default(cast(0 as bit)),
  latitude numeric(8, 6),
  longitude numeric(8, 6)
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
  stationid int references gasstations(stationid),
  reportdate date,
  octaneid int references octanes(octaneid)
);

create index stationidpricesindex on prices(stationid);
create index octaneidpricesindex on prices(octaneid);

create table users (
  userid serial primary key,
  pwhash varchar(64)
);

create table reviews (
  reviewid serial primary key,
  stationid int references gasStations(stationid),
  reviewerid int references users(userid),
  reviewdate date,
  reviewrating int,
  reviewdescription varchar(2000)
);

create index stationidreviewsindex on reviews(stationid);
create index revieweridreviewsindex on reviews(reviewerid);
