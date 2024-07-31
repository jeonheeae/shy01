const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const bodyParser = require("body-parser"); //모듈 import. Express v4.16.0이상은 설치 생략 가능
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "jha",
  port: 3306,
  password: "1234",
  database: "test_db",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "pw123456",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/profile");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.get("/profile", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + "/profile.html");
  } else {
    res.redirect("/");
  }
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/board", (req, res) => {
  res.sendFile(__dirname + "/board.html");
});

app.get("/nologinboard", (req, res) => {
  res.sendFile(__dirname + "/nologinboard.html");
});

app.get("/writing", (req, res) => {
  res.sendFile(__dirname + "/writing.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body; // query 는 get 방식
  const idOK = /^[A-Za-z0-9]{1,8}$/g.test(username); // 방법1. true or false 반환
  const pwOK = password.match(/^[A-Za-z0-9]{1,8}$/g); // 방법2. 정규표현식에 일치한 값
  console.log(idOK, pwOK, !!pwOK);

  if (idOK && !!pwOK) {
    if (username === "test" && password == "1234") {
      req.session.loggedIn = true;
      req.session.username = username;
      res.redirect("/");
    } else {
      res.send(`
        <h3>정상적인 로그인이 필요합니다.</h3>
        <button onclick="location.href='/'">뒤로가기</button>
        `);
    }
  } else {
    res.send(`<script>
      alert('입력조건이 맞지 않습니다. 다시 작성해 주세요!');
      window.location.href='/login';
      </script>`);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((e) => {
    if (e) console.error(e);
    res.send(
      `<script>alert('로그아웃이 되었습니다!!');window.location.href='/'</script>`
    );
  });
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
  const { title, author, date, content, views } = req.query;
  db.query(
    "INSERT INTO web3(title, author, date, content, views) VALUES(?, ?, ?, ?, ?)",
    [title, author, date, content, views],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect("/");
      console.log(
        `title: ${title}, author:${author}, date: ${date}, content:${content},  views:${views}`
      );
      console.log("Data inserted successfully");
    }
  ); // MySQL Query here
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
