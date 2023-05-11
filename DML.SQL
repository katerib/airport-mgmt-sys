-- DATA MANIPULATION QUERIES FOR FLIGHTS
-- Select All Flights
SELECT * FROM Flights;

-- Insert new flight
INSERT INTO Flights(flightNumber, gateID, aircraftID, numPassengers) VALUES
(:flightNumber, :gateID, :aircraftID, :numPassengers);

-- DATA MANIPULATION QUERIES FOR PASSENGERS
-- Select All Passengers
SELECT * FROM Passengers;

-- Insert new passenger's data
INSERT INTO Passengers(firstName, lastName, flightID) VALUES
(:firstName, :lastName, :flightID);

-- DATA MANIPULATION QUERIES FOR PASSENGERS_HAS_FLIGHTS
-- Select all from table
SELECT * FROM Passengers_has_Flights;

-- Insert into Passengers_has_Flights
INSERT INTO Passengers_has_Flights(passengerID, flightID) VALUES
(:passengerID, :flightID);