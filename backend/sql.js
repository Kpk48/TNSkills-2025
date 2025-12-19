const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'Srivari59*',
    database: 'Zoho',
});
client.connect()
    .then(() => console.log('Connected to the database'))
    .then(setup)
    .catch(err => console.error('Connection error', err.stack));
function setup() {
    const createVehiclesTable = `
        CREATE TABLE IF NOT EXISTS Vehicles (
            VehicleID VARCHAR(50) PRIMARY KEY,
            RegNO VARCHAR(50),
            Type VARCHAR(50),
            LastServiceDate DATE,
            CurrentOdometer BIGINT,
            LastServiceOdometer BIGINT
        );`;
    const createTripsTable = `
        CREATE TABLE IF NOT EXISTS Trips (
            TripID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            VehicleID VARCHAR(50),
            DriverName VARCHAR(100),
            StartDate DATE,
            EndDate DATE,
            DistanceKm BIGINT,
            FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID)
        );`;
    const createMaintenanceAlertsTable = `
        CREATE TABLE IF NOT EXISTS Maintenance_Alerts (
            AlertID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            VehicleID VARCHAR(50),
            AlertDate DATE,
            Reason VARCHAR(255),
            FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID)
        );`;
    const createServiceHistoryTable = `
        CREATE TABLE IF NOT EXISTS Service_History (
            ServiceID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            VehicleID VARCHAR(50),
            ServiceDate DATE,
            OdometerReading BIGINT,
            Notes VARCHAR(255),
            FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID)
        );`;
    client.query(createVehiclesTable)
        .then(() => console.log('Vehicles table created or exists'))
        .then(() => client.query(createTripsTable))
        .then(() => console.log('Trips table created or exists'))
        .then(() => client.query(createMaintenanceAlertsTable))
        .then(() => console.log('Maintenance_Alerts table created or exists'))
        .then(() => client.query(createServiceHistoryTable))
        .then(() => console.log('Service_History table created or exists'))
        .catch(err => console.error('Error executing table creation queries:', err.message))
        .finally(() => {
            console.log('Finished setup, ending client connection.');
            client.end();
        });
}
setup();
const populate=`INSERT into Vehicles(VehicleID,RegNo,type,LastServiceDate,CurrentOdometer,LastServiceOdometer)
values('V1','REG-001','Truck','2025-05-20',20000,10000),('V_001','REG-101','Van','2025-10-01',50400,40400),
('V_002','REG-102','Car','2025-11-15',12050,10000),('V_003','REG-103','Van','2025-08-20',8200,2000)`;
client.query(populate);
