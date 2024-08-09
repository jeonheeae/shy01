const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser"); //모듈 import. Express v4.16.0이상은 설치 생략 가능
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

app.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + "/toDoList.html");
  } else {
    res.send(`<style>
  @media only screen and (max-width: 767px) {
    body {
      background-image: url("https://e1.pxfuel.com/desktop-wallpaper/123/890/desktop-wallpaper-cinnamoroll-backgrounds-2022.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }
  }
  @media only screen and (min-width: 768px) {
    body {
      background-image: url("https://blog.kakaocdn.net/dn/Fihw4/btranVWawtV/dDjB1188GuE231FUBgkWe1/img.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-attachment: fixed;
    }
  }

  @media only screen and (min-width: 768px) {
    .container {
      max-width: 800px;
      background-image: url("https://i.namu.wiki/i/zXk5tCNrNYj9z2TkMRyWUWJTVtQ2h1DDoyu5yD7OFBLa10pFDuy-_08gd6s45m_eVgUdplIJSfeDHv4D9iF9yg.webp");
      background-position-y: 300px;
      margin: 0 auto;
      padding: 24px;
      height: 165px;
      border: 1px solid #ccc;
      border-radius: 10px;
      text-align: center;
      background-position-y: -30px;
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      max-width: 400px;
      margin: 0 auto;
      padding: 24px;
      height: 165px;
      border: 1px solid #ccc;
      border-radius: 10px;
      text-align: center;
      background-image: url("https://i.namu.wiki/i/L-0FmCF2P6i48wshSElTRKRQ-JS4SamjTtlCV3dUZZXXgELiwlECO-XSH67uk57wXHbYnKActb2O83p7MDi7fA.webp");
      background-position-y: 370px;
      background-position-x: 390px;
    }
  }

  h2 {
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    opacity: 0.8;
    color: rgb(54, 163, 196);
    text-shadow: 2px 2px 2px #7bceec;
    text-align: center;
    font-size: 1.5em;
    display: inline-block;
    max-width: 80%;
    margin: 0 auto;
  }

   h4 {
        margin-bottom: -5px;
        font-size: 15px;
        color: rgb(168, 231, 250);
      }

  #txt-input {
    width: 70%;
    padding: 8px;
    margin: 20px;
    border: 1px solid #ccc;
    background-color: white;
    opacity: 0.8;
    border-radius: 5px;
    transition: background-color 0.8s;
  }

  #txt-input:hover {
    background-color: #8abcf9;
  }


  button {
    font-weight: bold;
    padding: 8px 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: rgb(161, 195, 248);
    border: 1px solid #ccc;
    color: rgb(0, 0, 0);
    cursor: pointer;
    transition: background-color 0.8s;
  }

  button:hover {
    background-color: #005fd2;
    font-weight: bold;
  }

  #add-btn {
    font-weight: bold;
    padding: 8px 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: rgb(255, 243, 216);
    border: 1px solid #ccc;
    opacity: 0.8;
    color: rgb(0, 0, 0);
    cursor: pointer;
    transition: background-color 0.8s;
  }
  #add-btn:hover {
    background-color: #ffee2e;
    font-weight: bold;
  }
</style>
<button onclick="window.location.href='/join'">가입하기</button>
<button onclick="window.location.href='/login'">로그인하기</button>
<h4>자신만의 toDoList를 작성해보세요.꒰･◡･๑꒱:*:･｡☆ﾟ’･:*:</h4>
<hr />
<div class="container">
  <h2>할 일 목록</h2>
  <br />
  <input id="txt-input" type="text" placeholder="오늘의 할 일을 작성하세요." />
  <br />
  <button
    id="add-btn"
    onclick="alert('로그인이 필요합니다.');window.location.href='/login'"
  >
    추가하기
  </button>
  <div></div>
</div>`);
  }
});

app.get("/join", (req, res) => {
  res.sendFile(__dirname + "/join.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const { id, password } = req.body; // query 는 get 방식
  const idOK = /^[A-Za-z0-9]{1,8}$/g.test(id); // 방법1. true or false 반환
  const pwOK = password.match(/^[A-Za-z0-9]{1,8}$/g); // 방법2. 정규표현식에 일치한 값
  console.log(idOK, pwOK, !!pwOK);

  if (idOK && !!pwOK) {
    if (id === "user" && password == "1234") {
      req.session.loggedIn = true;
      req.session.id = id;
      res.redirect("/");
    } else {
      res.send(`
       <div
  style="
    text-align: center;
    padding: 20px;
    background-image: url('https://blog.kakaocdn.net/dn/dQfUTU/btraqRm18OL/bEGhBkYe5zts6gVL3nTOi1/img.png');
    background-size: auto;
    background-repeat: no-repeat;
    background-position: center;
  "
>
  <h3 style="color: #333">정상적인 로그인이 필요합니다.</h3>
  <h4 style="color: #666">회원이 아니신 분은 회원가입을 해주세요.</h4>
  <button
    style="
      font-weight: bold;
      padding: 8px 10px;
      margin: 10px;
      border-radius: 5px;
      background-color: #b8eeff;
      color: black;
      border: 1px solid #ccc;
      opacity: 0.8;
      cursor: pointer;
      transition: background-color 0.8s;
    "
    onclick="location.href='/join'"
  >
    가입하기
  </button>
  <button
    style="
      font-weight: bold;
      padding: 8px 10px;
      margin: 10px;
      border-radius: 5px;
      background-color: #b8eeff;
      color: black;
      border: 1px solid #ccc;
      opacity: 0.8;
      cursor: pointer;
      transition: background-color 0.8s;
    "
    onclick="location.href='/'"
  >
    뒤로가기
  </button>
</div>
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

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
