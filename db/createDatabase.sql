create database gasPrices;

\c gasPrices;

create table gasStations (
  stationId serial primary key,
  stationName varchar(50),
  stationStreetAddress varchar(255),
  stationCity varchar(50),
  stationState varchar(2),
  stationZip int CHECK (stationZip > 9999) CHECK (stationZip < 100000),
  needMembership bit default(0),
  latitude numeric(8, 6),
  longitude numeric(8, 6)
);

create table octanes (
  octaneId serial primary key,
  octaneName varchar(15)
);

create table prices (
  priceId serial primary key,
  stationId int references gasStations(stationId),
  reportTime dateTime,
  octaneId int references octanes(octaneId)
);

create index stationIdPricesIndex on prices(stationId);
create index octaneIdPricesIndex on prices(octaneId);

create table users (
  userId serial primary key,
  pwHash varchar(64)
);

create table reviews (
  reviewId serial primary key,
  stationId int references gasStations(stationId),
  reviewerId int references users(userId),
  reviewDate dateTime,
  reviewRating int,
  reviewDescription varchar(2000)
);

create index stationIdReviewsIndex on reviews(stationId);
create index reviewerIdReviewsIndex on reviews(reviewerId);
