const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const bodyParser = require("body-parser"); // 설치생략
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "pw123456",
    resave: false,
    saveUninitialized: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "jha",
  port: 3306,
  password: "1234",
  database: "test_db",
});

db.connect((error) => {
  if (error) {
    console.log("접속실패!!");
    return;
  }
  console.log("MySQL Connected!");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password == "1234") {
    req.session.loggedIn = true;
    if (!req.session.num1) {
      req.session.num1 = 1;
    } else {
      req.session.num1 += 1;
    }
    req.session.username = username;
    res.send(
      `<script>alert('${req.session.num1}번째 로그인이 되었습니다');window.location.href='/mypage'</script>`
    );
  }
  if (username === "admin" && password == "123456") {
    req.session.adminOk = true;
    res.send(
      `<script>alert('관리자로 로그인이 되었습니다');window.location.href='/mypage'</script>`
    );
  }
});

app.get("/logout", (req, res) => {
  req.session.loggedIn = false;
  req.session.adminOk = false;
  res.send(
    `<script>alert('로그아웃 되었습니다.');window.location.href='/'</script>`
  );
});

app.get("/mypage", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + "/mypage.html");
  } else if (req.session.adminOk) {
    res.send(
      "<h1>관리자페이지</h1><script>window.location.href='/list'</script>"
    );
  } else {
    res.sendFile(__dirname + "/login.html");
  }
});

app.get("/content", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + "/content.html");
  } else {
    res.sendFile(__dirname + "/login.html");
  }
});

app.get("/del", (req, res) => {
  const del = req.query.delitem;
  db.query(`DELETE FROM tb2 WHERE num=${del}`, (err, results) => {
    res.send(
      "<script>alert('목록이 삭제 되었습니다.');window.location.href='list'</script>"
    );
  });
});

app.get("/list", (req, res) => {
  db.query("SELECT * from tb2", (err, results) => {
    const data = results;
    console.log(data);
    let list = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">`;
    list += `    <title>리스트</title>`;
    list += `    <style>`;
    list += `h2 {`;
    list += `  margin-bottom: 20px;`;
    list += `  text-align: center;`;
    list += `  display: block;`;
    list += `  padding: 10px 30px;`;
    list += `  margin: 0 auto;`;
    list += `  width: fit-content;`;
    list += `}`;
    list += `body {`;
    list += `  background-image: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9940144C5D3D32F925");`;
    list += `}`;
    list += `table {`;
    list += `  width: 80%;`;
    list += `  border-collapse: collapse;`;
    list += `  margin: 30px auto;`;
    list += `}`;
    list += `th,`;
    list += `td {`;
    list += `  padding: 8px;`;
    list += `  text-align: center;`;
    list += `}`;
    list += `th {`;
    list += `  background-color: #003e07;`;
    list += `  color: aliceblue;`;
    list += `}`;
    list += `tr {`;
    list += `  border: 1px solid black;`;
    list += `  background-color: #f9f9f9;`;
    list += `}`;
    list += `a {`;
    list += `  text-decoration: none;`;
    list += `  color: #333;`;
    list += `}`;
    list += `button {`;
    list += `  background-color: rgb(249, 251, 227);`;
    list += `  border: 3px solid rgba(128, 103, 74, 0.885);`;
    list += `  margin-top: 17px;`;
    list += `  padding: 8px 15px;`;
    list += `  border-radius: 5px;`;
    list += `  cursor: pointer;`;
    list += `  font-size: 1rem;`;
    list += `  transition: all 0.5s;`;
    list += `}`;

    list += `.wrt-button {`;
    list += `  background-color: rgb(249, 251, 227);`;
    list += `  border: 3px solid rgba(128, 103, 74, 0.885);`;
    list += `  padding: 10px 20px;`;
    list += `  border-radius: 5px;`;
    list += `  cursor: pointer;`;
    list += `  position: fixed;`;
    list += `  top: 20px;`;
    list += `  right: 20px;`;
    list += `}`;

    list += `    </style>`;
    list += `</head>`;
    list += ``;
    list += `<body>`;
    list += `    <!-- table>tr>th*5^tr>td*5 -->`;
    list += `    <h2>게시판 입니다.</h2>`;
    if (req.session.adminOk) {
      list += `    <h2>[관리자 권한]</h2>`;
    }
    list += `<button type="button" onclick="location.href='/'">뒤로가기</button>`;

    list += `    <table>`;
    list += `        <tr>`;
    list += `            <th>글번호</th>`;
    list += `            <th>제목</th>`;
    list += `            <th>작성자</th>`;
    list += `            <th>작성일자</th>`;
    list += `            <th>조회수</th>`;
    if (req.session.adminOk) {
      list += `            <th>삭제</th>`;
    }

    list += `        </tr>`;

    data.forEach((v, i) => {
      list += `        <tr>`;
      list += `            <td>${v.num}</td>`;
      list += `            <td><a href="/detail?search=${v.num}">${v.title}</a></td>`;
      list += `            <td>${v.name}</td>`;
      list += `            <td>${v.date}</td>`;
      list += `            <td>${v.count}</td>`;
      /* 예1 */
      // list += `            <td><button id="del${i}">삭제</button></td>`;
      /* 예2 */

      if (req.session.adminOk) {
        list += `            <td><a href="/del?delitem=${v.num}">삭제</a></td>`;
      }
      list += `        </tr>`;
    });

    // console.log(1, req.session.loggedIn);
    // if (req.session.loggedIn) {
    list += `    </table><button class="wrt-button" onclick="location.href='/content'">글쓰기</button>`;
    // }
    list += `</body>`;
    list += ``;
    list += `</html>`;
    res.send(list);
  });
});

let counter = 0;
/* 클릭시 디테일창 */

app.get("/detail", (req, res) => {
  const search = req.query.search;
  console.log(search);
  db.query(`SELECT * FROM tb2 WHERE num=${search}`, (err, results) => {
    res.send(`
      <html>
      <head>
        <style>
          body {
            background-image: url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9943DF4C5D3D32FA25);
            font-family: Arial, sans-serif;
          }
          .post {
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .title {
            font-size: 24px;
            color: #555;
            margin-bottom: 10px;
            font-weight: bold;
          }
          .author {
            font-size: 16px;
            color: #555;
            margin-bottom: 10px;
          }
          .content {
        background-color: rgb(249, 251, 227);
        border: 3px solid rgba(128, 103, 74, 0.885);
        padding: 3px 7px;
        border-radius: 5px;
        font-weight: bold;
          }
          .count {
            font-size: 12px;
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="post">
          <div class="num">${results[0].num}</div>
          <div class="title">제목 : ${results[0].title}</div>
          <div class="author">작성자: ${results[0].name}</div>
          <div class="date">작성일: ${results[0].date}</div>
          <div class="content">내용 : ${results[0].content}</div>
          <div class="count">조회수: ${results[0].count}</div>
        </div>
      </body>
      </html>
    `);
    counter = results[0].count + 1;
  });

  /* 카운트 부분*/
  db.query(
    `UPDATE tb2 SET count = ${counter} WHERE num=${search}`,
    (err, results) => {
      console.log("조회수증가:", counter);
    }
  );
});

/* 게시판 입력부분 */
app.post("/data", (req, res) => {
  const { title, name, date, content } = req.body;
  // db.query("INSERT INTO tb2 ( title, name, date, content,count) VALUES (?,?,?,?,?)", [title, name, date, content, 0], (err, result) => {
  db.query(
    `INSERT INTO tb2 ( title, name, date, content,count) VALUES ("${title}", "${name}", "${date}", "${content}", 0)`,
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(
        `<script>alert('내용이 저장 되었습니다');window.location.href='/list'</script>`
      );
      console.log("Data inserted successfully");
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
