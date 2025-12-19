CREATE TABLE IF NOT EXISTS Vehicles (
                                        VehicleID VARCHAR(50) PRIMARY KEY,
    RegNO VARCHAR(50),
    Type VARCHAR(50),
    LastServiceDate DATE,
    CurrentOdometer BIGINT,
    LastServiceOdometer BIGINT
    );
CREATE TABLE IF NOT EXISTS Trips (
                                     TripID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                     VehicleID VARCHAR(50),
    DriverName VARCHAR(100),
    StartDate DATE,
    EndDate DATE,
    DistanceKm BIGINT,
    FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID)
    );

CREATE TABLE IF NOT EXISTS Maintenance_Alerts (
                                                  AlertID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                  VehicleID VARCHAR(50),
    AlertDate DATE,
    Reason VARCHAR(255),
    FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID)
    );

CREATE TABLE IF NOT EXISTS Service_History (
                                               ServiceID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                               VehicleID VARCHAR(50),
    ServiceDate DATE,
    OdometerReading BIGINT,
    Notes VARCHAR(255),
    FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID)
    );


INSERT into Vehicles(VehicleID,RegNo,type,LastServiceDate,CurrentOdometer,LastServiceOdometer)
values('V1','REG-001','Truck','2025-05-20',20000,10000),('V_001','REG-101','Van','2025-10-01',50400,40400),
      ('V_002','REG-102','Car','2025-11-15',12050,10000),('V_003','REG-103','Van','2025-08-20',8200,2000)
INSERT INTO TRIPS(VehicleID,DriverName,StartDate,EndDate,DistanceKm) VALUES ('V1','TestDriver','2025-12-20','2025-12-30',500);
