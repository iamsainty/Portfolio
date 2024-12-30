require("dotenv").config();

const mysql = require("mysql2");

const mysqlDB = mysql.createConnection({
    host: process.env.AWS_MYSQL_HOST,
    port: process.env.AWS_MYSQL_PORT,
    user: process.env.AWS_MYSQL_USER,
    password: process.env.AWS_MYSQL_PASSWORD,
    database: process.env.AWS_MYSQL_NAME,
  });
  
  const connectToMySQL = () => {
    try {
      mysqlDB.connect((err) => {
        if (err) {
          console.error("Error connecting to MySQL:", err.stack);
          process.exit(1); // Exit the process on failure
        } else {
          console.log("Connected to MySQL as id " + mysqlDB.threadId);
        }
      });
    } catch (error) {
      console.error("Unexpected error while connecting to MySQL:", error);
      process.exit(1); // Exit the process on failure
    }
  };  

module.exports = connectToMySQL;
