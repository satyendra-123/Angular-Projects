var mysql = require('mysql');

var connectionInfo = {
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db',
    port: 3306
};

//connection to mysql
var connection = mysql.createConnection(connectionInfo);
//connection.connect()

exports.query = function (query, callback) {
    /* var connection = mysql.createConnection(connectionInfo); */
    connection.query(query, function (queryError, result) {
        callback(queryError, result);
    });
    connection.end();
};

module.exports = connection