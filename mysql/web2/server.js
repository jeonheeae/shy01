const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "jha",
  port: 3306,
  password: "1234",
  database: "mydatabase",
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
  const { id, password, name, email } = req.query;
  db.query(
    "INSERT INTO web2( id, password, name, email) VALUES(?, ?, ?, ?)",
    [id, password, name, email],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect("/");
      console.log(
        ` id: ${id}, password: ${password}, name:${name}, email: ${email}`
      );
      console.log("Data inserted successfully");
    }
  );
});

app.listen(port, () => {
  console.log(`server is running at  http://localhost:${port}`);
});
