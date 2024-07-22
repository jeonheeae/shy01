const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "jha",
  post: 3306,
  password: "1234",
  database: "test_db",
});
db.connect((error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log("DB에 성공적인 접속");
});
app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);
