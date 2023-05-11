// App.js

/*
    SETUP
*/
var express = require('express');
var app     = express();            // instantiate an express object to interact with the server
PORT        = 9126;

app.use(express.static('public'));

/*
    ROUTES
*/
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.sendFile(__dirname + '/index.html');
    });

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});