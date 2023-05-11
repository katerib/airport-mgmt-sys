-- DATA MANIPULATION QUERIES FOR FLIGHTS
-- Select All Flights
SELECT * FROM Flights;

-- Insert new flight
INSERT INTO Flights(flightNumber, gateID, aircraftID, numPassengers) VALUES
(:flightNumber, :gateID, :aircraftID, :numPassengers);

-- Update Flights data
UPDATE Flights SET flightNumber = :flightNumber, gateID= :gateID, aircraftID = :aircraftID, numPassengers= :numPassengers WHERE id= :flightID

--Delete Flights Data
DELETE FROM Flights WHERE id= :flightID

-- DATA MANIPULATION QUERIES FOR PASSENGERS
-- Select All Passengers
SELECT * FROM Passengers;

-- Insert new passenger's data
INSERT INTO Passengers(firstName, lastName, flightID) VALUES
(:firstName, :lastName, :flightID);

-- Update Passenger Data
UPDATE Passengers SET firstName = :firstName, lastName= :lastName, flightID = :flightID WHERE id= :passengerID

-- Delete Passenger Data 
DELETE FROM Passengers WHERE id= :passengerID

-- DATA MANIPULATION QUERIES FOR PASSENGERS_HAS_FLIGHTS
-- Select all from table
SELECT * FROM Passengers_has_Flights;

-- Insert into Passengers_has_Flights
INSERT INTO Passengers_has_Flights(passengerID, flightID) VALUES
(:passengerID, :flightID);

-- Update Passenger_has_flights
UPDATE Passengers_has_Flights SET passengerID = :passengerID, flightID= :flightID WHERE id= :passengerID

-- Delete from Passengers_has_flights
DELETE FROM Passengers_has_Flights WHERE id= :passengerID

-- DATA MANIPULATION QUERIES FOR Terminals
-- Select All Terminals
SELECT * FROM Terminals;
-- Insert new Terminal data
INSERT INTO Terminals(terminalName, numGates) VALUES
(:terminalname, :gatename);
-- Update Terminal Data
UPDATE Terminals SET terminalName = :terminalname, numGates= :numbergates, numOpenGates = :numberopengates WHERE id= :terminalID
-- Delete Terminal Data
DELETE FROM Terminals WHERE id = :terminalID

-- DATA MANIPULATION QUERIES FOR Gates
-- Select All Gates
SELECT * FROM Gates;

-- Insert new Gate data
INSERT INTO Gates(gateName, terminalID) VALUES
(:gatename, :terminalID);

-- Update Gate Data
UPDATE Gates SET terminalID = :terminalID, flightID= :flightID, gateName = :gatename, isOpen = :isopen, flightArrivalTime= : flightArrivalTime, flightDepartureTime= : flightDepartureTime WHERE id= :gateID
-- Delete Gate Data
DELETE FROM Gates WHERE id = :gateID

-- DATA MANIPULATION QUERIES FOR Aircrafts
-- Select All Aircrafts
SELECT * FROM Aircrafts;

-- Insert new aircraft data
INSERT INTO Aircrafts(airlineCompany, maxPassengers) VALUES
(:airlinecomapny, :maxpassengers);

-- Update aircraft Data
UPDATE Aircrafts SET airlineCompany = :airlineCompany, maxPassengers= :maxPassengers WHERE id= :aircraftID
-- Delete aircraft Data
DELETE FROM Aircraft WHERE id = :aircraftID

