-- DATA DEFINITION QUERIES with sample Insert statements

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- -----------------------------------------------------
-- TABLE STRUCTURES: Terminals, Gates, Aircrafts, Flights, Passengers, Passengers_has_Flights
-- -----------------------------------------------------

-- Table Structure for: Terminals

CREATE OR REPLACE TABLE Terminals (
    terminalID int(11) AUTO_INCREMENT NOT NULL UNIQUE,
    terminalName varchar(255) NOT NULL UNIQUE,
    numGates int(11) NOT NULL,
    numOpenGates int(11) NOT NULL,
    PRIMARY KEY (terminalID)
);

-- Table Structure for: Gates

CREATE OR REPLACE TABLE Gates (
    gateID int(11) AUTO_INCREMENT NOT NULL UNIQUE,
    terminalID int(11) NOT NULL,
    gateName varchar(255) NOT NULL,
    isOpen tinyint(1) NOT NULL,
    flightID int(11),
    flightArrivalTime datetime,
    flightDepartureTime datetime,
    PRIMARY KEY (gateID),
    FOREIGN KEY (terminalID) REFERENCES Terminals(terminalID),
    FOREIGN KEY (flightID) REFERENCES Flights(flightID)
);

-- Table Structure for: Aircrafts

CREATE OR REPLACE TABLE Aircrafts (
    aircraftID int(11) AUTO_INCREMENT NOT NULL UNIQUE,
    maxPassengers int(11) NOT NULL,
    airlineCompany varchar(255) NOT NULL,
    PRIMARY KEY (aircraftID)
);

-- Table Structure for: Flights

CREATE OR REPLACE TABLE Flights (
    flightID int(11) AUTO_INCREMENT NOT NULL UNIQUE,
    flightNumber int(11) NOT NULL UNIQUE,
    gateID int(11),
    aircraftID int(11) NOT NULL,
    numPassengers int(11) NOT NULL,
    PRIMARY KEY (flightID),
    FOREIGN KEY (aircraftID) REFERENCES Aircrafts(aircraftID),
    FOREIGN KEY (gateID) REFERENCES Gates(gateID)
);

-- Table Structure for: Passengers

CREATE OR REPLACE TABLE Passengers (
    passengerID int(11) AUTO_INCREMENT NOT NULL UNIQUE,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    flightID int(11),
    PRIMARY KEY (passengerID),
    FOREIGN KEY (flightID) REFERENCES Flights(flightID)
);

-- Table Structure for: Passengers_has_Flights

CREATE OR REPLACE TABLE Passengers_has_Flights (
    passengerID int(11) NOT NULL,
    flightID int(11) NOT NULL,
    PRIMARY KEY (passengerID, flightID),
    FOREIGN KEY (passengerID) REFERENCES Passengers(passengerID),
    FOREIGN KEY (flightID) REFERENCES Flights(flightID)
);

-- -----------------------------------------------------
-- Insert into Tables
-- -----------------------------------------------------


-- Insert into: Terminals
INSERT INTO Terminals (terminalName, numGates, numOpenGates) VALUES
('A', 5, 4),
('B', 10, 5),
('C', 6, 1);

-- Insert into: Gates (0 open, 1 occupied)
INSERT INTO Gates (gateName, terminalID, isOpen, flightArrivalTime, flightDepartureTime, flightID) VALUES
('EE', 1, 1, '2023-06-01 10:30:00', '2023-06-01 14:25:00', 2),
('FF', 1, 0, '2023-06-01 15:00:00', '2023-06-01 16:00:00', 3),
('GG', 3, 1, '2023-06-01 02:00:00', '2023-06-01 06:30:00', 4),
('HH', 2, 0, '2023-06-01 07:00:00', '2023-06-01 13:45:00', 1);

-- Insert into: Aircrafts
INSERT INTO Aircrafts (airlineCompany, maxPassengers) VALUES
('Delta', 100),
('American', 125),
('United', 225),
('Delta', 250);

-- Insert into: Flights
INSERT INTO Flights (flightNumber, aircraftID, numPassengers, gateID) VALUES
(1690, 1, 100, 1),
(1456, 2, 120, 2),
(1563, 3, 130, 3),
(1234, 4, 250, 3);

-- Insert into: Passengers
INSERT INTO Passengers (firstName, lastName, flightID) VALUES
('Super', 'Man', NULL),
('Spider', 'Man', NULL),
('Wonder', 'Woman', NULL),
('Black', 'Widow', 1),
('Iron', 'Man', 4);

-- Insert into: Passengers_has_Flights
INSERT INTO Passengers_has_Flights (passengerID, flightID) VALUES
(1, 3),
(2, 2),
(3, 3),
(4, 1),
(5, 4);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
-- SHOW WARNINGS;
-- SELECT @@warning_count;