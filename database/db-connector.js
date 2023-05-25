// Get an instance of mysql we can use in the app
var mysql = require('mysql')
const {password} = require('.db-config.js')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_boinkk',
    password        : password,
    database        : 'cs340_boinkk'
})

// Export it for use in our applicaiton
module.exports.pool = pool;