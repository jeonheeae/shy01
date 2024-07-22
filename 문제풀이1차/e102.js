const express = require("express");
const bodyParser = require("body-parser"); //모듈 import. Express v4.16.0이상은 설치 생략 가능
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/e101.html");
});

app.post("/", (req, res) => {
  const { username, password } = req.body; // query 는 get 방식
  const idOK = /^[A-Za-z0-9]{1,8}$/g.test(username); // 방법1. true or false 반환
  const pwOK = password.match(/^[A-Za-z0-9]{1,8}$/g); // 방법2. 정규표현식에 일치한 값
  console.log(idOK, pwOK, !!pwOK);

  if (idOK && !!pwOK) {
    //res.send("로그인되었습니다.");
    if (username === "admin" && password === "123456") {
      res.send(`
        
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인 페이지</title>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원 관리</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f9f9f9;
            font-family: 'Arial', sans-serif;
        }
        .container {
            text-align: center;
            border: 2px solid #333;
            padding: 20px;
            border-radius: 10px;
        }
        .btn-pink {
            padding: 10px 20px;
            margin: 10px;
            border: none;
            border-radius: 5px;
            background-color: #ff69b4; /* 핑크색 */
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }
        .btn-yellow {
            padding: 10px 20px;
            margin: 10px;
            border: none;
            border-radius: 5px;
            background-color: #ffd700; /* 노란색 */
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
</head>

  <body>
      <div class="container">
          <h1>관리자로 로그인 하셨습니다.</h1>
        <button class="btn-pink">회원 관리</button>
         <button class="btn-yellow">회원 삭제</button>
      </div>
      </div>
  </body>`);
    }
  } else {
    res.send("형식에 맞도록 입력하세요.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
