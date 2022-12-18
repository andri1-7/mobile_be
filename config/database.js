let mysql = require("mysql2");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Airmas12345678",
  database: "tes",
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Koneksi Berhasil!");
  }
});

module.exports = connection;
