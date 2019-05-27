var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mahi7781",
  database:"dbname"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


module.exports = con;