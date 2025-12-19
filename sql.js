const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "Srivari59*",
    database: "userdb",
    port: 5432
});
function setSchema() {
pool.query("create table Vehicles(\n" +
    "VehicleID varchar primary key,\n" +
    "RegNO varchar,\n" +
    "Type varchar,\n" +
    "LastServiceDate date,\n" +
    "CurrentOdometer bigint,\n" +
    "LastServiceOdometer bigint\n" +
    ");\n" +
    "\n" +
    "create table Trips(\n" +
    "TripID int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,\n" +
    "VehicleID int foreign key references Maintenance_Alerts(VehicleID),\n" +
    "DriverName varchar,\n" +
    "StartDate date,\n" +
    "EndDate date,\n" +
    "DistanceKm bigint,\n" +
    ");\n" +
    "\n" +
    "create table Maintenance_Alerts(\n" +
    "AlertID PRIMARY KEY GENERATED ALWAYS AS IDENTITY,\n" +
    "VehicleID foreign key references Trips(VehicleID),\n" +
    "AlertDate date,\n" +
    "Reason varchar,\n" +
    ")\n" +
    "\n" +
    "create table Service_History(\n" +
    "ServiceID PRIMARY KEY GENERATED ALWAYS AS IDENTITY,\n" +
    "VehicleID foreign key references Trips(VehicleID),\n" +
    "ServiceDate date,\n" +
    "OdometerReading bigint,\n" +
    "Notes varchar, \n" +
    ")", (err, res) => {});}
