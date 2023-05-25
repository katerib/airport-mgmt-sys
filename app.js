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






//gets Gates page
app.get('/gates', function(req, res)
    {  
        let query1 = "SELECT * FROM Gates;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('gates', {data: rows});                  // Render the gates.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

//gets Passengers page
app.get('/passengers', function(req, res)
    {  
        let query1 = "SELECT * FROM Passengers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('passengers', {data: rows});                  // Render the passenger.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query


//gets aircrafts page
app.get('/aircraft', function(req, res)
    {  
        let query1 = "SELECT * FROM Aircrafts;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('aircraft', {data: rows});                  // Render the aircraft.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

    
//gets Flights page
app.get('/flights', function(req, res)
    {  
        let query1 = "SELECT * FROM Flights;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('flights', {data: rows});                  // Render the flights.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

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
    query1 = `INSERT INTO \`Passengers_has_Flights\`(\`passengerID (FK)\`, \`flightID (FK)\`) VALUES (${data['input-passenger']}, ${data['input-flightNum']})`;
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


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});