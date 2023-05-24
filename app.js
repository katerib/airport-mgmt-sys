/*
    SETUP
*/

// Express
const express = require('express');
const app = express();
PORT = 9336;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

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

            res.render('terminals', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

//gets Gates page
app.get('/gates', function(req, res)
    {  
        let query1 = "SELECT * FROM Gates;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('gates', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

//gets Flights page
app.get('/flights', function(req, res)
    {  
        let query1 = "SELECT * FROM Flights;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('flights', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query





/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});