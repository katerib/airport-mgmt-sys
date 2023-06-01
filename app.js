/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

PORT = 9126;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Static Files
app.use(express.static('public'));

/*
    ROUTES
*/

//gets home page
app.get('/', function(req, res)
    {  
        {res.render('index');}                                                    
    });                                                         

//gets Terminals page
app.get('/terminals', function(req, res)
    {  
        let query1 = "SELECT * FROM Terminals;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('terminals', {data: rows});                  // Render the terminals.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query


//Creates new terminal
app.post('/add-terminal-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO Terminals (terminalName, numGates, numOpenGates) VALUES ('${data['input-terminalName']}', ${data['input-numGates']}, ${data['input-numGates']});`;
    db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
        if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
    
            else
            {
                res.redirect('/terminals');
            }
        })
    })


app.delete('/delete-terminal-ajax/', function(req,res,next){
    let data = req.body;
    let terminalID = parseInt(data.terminalID);
    let deleteTerminal = `DELETE FROM Terminals WHERE terminalID = ?`;
    
        // Run the 1st query
        db.pool.query(deleteTerminal, [terminalID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }     
})});

//updates terminal
app.put('/update-terminal-ajax', function(req,res,next){
    let data = req.body;

    let terminalID = parseInt(data.terminalID);
    let terminalName = data.terminalName;
    let numGates = parseInt(data.numGates);
    let numOpenGates = parseInt(data.numOpenGates);

    let updateTerminal = `UPDATE Terminals SET terminalName = ?, numGates = ?, numOpenGates = ? WHERE terminalID = ?`;

    db.pool.query(updateTerminal, [terminalName, numGates, numOpenGates, terminalID], function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
})});

//gets Gates page
app.get('/gates', function(req, res)
    {  
        let query1 = "SELECT * FROM Gates;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('gates', {data: rows});                  // Render the gates.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.delete('/delete-gate-ajax/', function(req,res,next){
    let data = req.body;
    let gateID = parseInt(data.gateID);
    let deleteGate = `DELETE FROM Gates WHERE gateID = ?`;
    
        // Run the 1st query
        db.pool.query(deleteGate, [gateID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }     
})});

//gets Passengers page
app.get('/passengers', function(req, res)
    {  
        let query1 = "SELECT * FROM Passengers;";               // Define our query
        let query2 = "SELECT * FROM Flights;";
        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            let passenger = rows
            db.pool.query(query2, (error, rows, fields) => {
                let flights = rows;
                return res.render('passengers', {data: passenger, flights:flights});
            })
                                                                // Render the passenger.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

//Deletes passenger
app.delete('/delete-passenger-ajax/', function(req,res,next){
    let data = req.body;
    let passengerID = parseInt(data.passengerID);
    let deletePassenger = `DELETE FROM Passengers WHERE passengerID = ?`;
    
        // Run the 1st query
        db.pool.query(deletePassenger, [passengerID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
                
                res.sendStatus(204);

            }     
        })
        
});

//Adds a new passenger
app.post('/add-passenger-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO \`Passengers\` (\`firstName\`, \`lastName\`, \`flightID\`) VALUES ('${data['input-firstName']}', '${data['input-lastName']}', ${data['flight-select']})`;
    db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
        if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
    
            else
            {
                res.redirect('/passengers');
            }
        })
    })


//gets aircrafts page
app.get('/aircraft', function(req, res)
    {  
        let query1 = "SELECT * FROM Aircrafts;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('aircraft', {data: rows});                  // Render the aircraft.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

//Creates new aircraft
app.post('/add-aircraft-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO Aircrafts (airlineCompany, maxPassengers) VALUES ('${data['input-airlineCompany']}', ${data['input-maxPassengers']});`;
    db.pool.query(query1, function(error, rows, fields){
    
        // Check to see if there was an error
        if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
    
            else
            {
                res.redirect('/aircraft');
            }
        })
    })
// Deletes aircraft
app.delete('/delete-aircraft-ajax/', function(req,res,next){
    let data = req.body;
    let aircraftID = parseInt(data.aircraftID);
    let deleteAircraft = `DELETE FROM Aircrafts WHERE aircraftID = ?`;
    
        // Run the 1st query
        db.pool.query(deleteAircraft, [aircraftID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }     
})});

// Updates Aircraft
app.put('/update-aircraft-form-ajax', function(req,res,next){
    let data = req.body;

    let aircraftID = parseInt(data.aircraftID);
    let maxPassengers = parseInt(data.maxPassengers);
    let airlineCompany = data.airlineCompany;

    let updateAircraft = `UPDATE Aircrafts SET maxPassengers = ?, airlineCompany = ? WHERE aircraftID = ?`;

    db.pool.query(updateAircraft, [maxPassengers, airlineCompany, aircraftID], function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
})});

//gets Flights page
app.get('/flights', function(req, res)
    {  
        let query1 = "SELECT * FROM Flights;";               // Define our query
        let query2 = "SELECT * FROM Gates;";  
        let query3 = "SELECT * FROM Aircrafts;"
        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            let flights = rows
            db.pool.query(query2, (error, rows, fields) => {
                let gates = rows;
                db.pool.query(query3, (error, rows, fields) => {
                    let aircrafts = rows;
            return res.render('flights', {data: flights, gates:gates, aircrafts:aircrafts});                  // Render the flights.hbs file, and also send the renderer
            })                                                      // an object where 'data' is equal to the 'rows' we
        })
    })
});                                                         // received back from the query

// Deletes flight info
app.delete('/delete-flight-ajax/', function(req,res,next){
    let data = req.body;
    let flightID = parseInt(data.flightID);
    let deleteFlight = `DELETE FROM Flights WHERE flightID = ?`;
    
        // Run the 1st query
        db.pool.query(deleteFlight, [flightID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }     
})});
    
//adds flights 
app.post('/add-flight-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO \`Flights\` (\`flightNumber\`, \`gateID\`, \`aircraftID\`, \`numPassengers\`) VALUES (${data['input-flight-num']}, ${data['gate-select']}, ${data['aircraft-select']},${data['input-passenger-num']})`;
    db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
        if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
    
            else
            {
                res.redirect('/flights');
            }
        })
    })

//gets Active Passengers page
app.get('/active-passengers', function(req, res)
    {  
        let query1 = "SELECT * FROM Passengers_has_Flights;";               // Define our query
        let query2 = "SELECT * FROM Passengers;";   // multiple queries taken to fill the drop down options in booked passengers page
        let query3 = "SELECT * FROM Flights;";
        db.pool.query(query1, function(error, rows, fields){
            let booked = rows;
            db.pool.query(query2, (error, rows, fields) => {
                let passengers = rows;
                db.pool.query(query3, (err, rows, fields)=>{
                    let flights = rows;
                    return res.render('active-passengers', {data: booked, passengers: passengers, flights: flights});
                })   
        })                                                      
    });           
})      


//Adds a new booked passenger
app.post('/add-bookedPassenger-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO \`Passengers_has_Flights\`(\`passengerID\`, \`flightID\`) VALUES (${data['input-passenger']}, ${data['input-flightNum']})`;
    db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
        if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
    
            else
            {
                res.redirect('/active-passengers');
            }
        })
    })

app.delete('/delete-bookedPassenger-ajax/', function(req, res, next) {
    let data = req.body;
    let passengerID = parseInt(data.passengerID);
    let deleteBookedPassenger = `DELETE FROM Passengers_has_Flights WHERE passengerID = ?`;
    
    // Run the query
    db.pool.query(deleteBookedPassenger, [passengerID], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});
// updates booked passenger    
app.put('/update-bookedPassenger-ajax', function(req,res,next){
    let data = req.body;

    let passengerID = parseInt(data.passengerID);
    let flightID = parseInt(data.flightID);


    let updateBookedPassenger = `UPDATE Passengers_has_Flights SET flightID = ? WHERE passengerID = ?`;

    db.pool.query(updateBookedPassenger, [flightID, passengerID], function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
})});

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});