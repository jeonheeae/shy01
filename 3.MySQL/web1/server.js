const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "jha",
  port: 3306,
  password: "1234",
  database: "test_db",
});

db.connect((error) => {
  if (error) {
    console.log("접속 실패!!");
    return;
  }
  console.log("MySQL Connected!");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  console.log("웹에 정상 접속 하였습니다.");
});

app.get("/data", (req, res) => {
  const { name, dob } = req.query;
  db.query(
    "INSERT INTO web(name, dob) VALUES(?, ?)",
    [name, dob],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect("/");
      console.log(`name: ${name}, dob: ${dob}`);
      console.log("Data inserted successfully");
    }
  ); // MySQL Query here
});

app.listen(port, () => {
  console.log(`server is running at  http://localhost:${port}`);
});
