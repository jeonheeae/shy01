const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(logger());
app.use(bodyParser.urlencoded({ extends: true }));

app.use(
  session({
    secret: "pw123456",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  if (req.session.userId) {
    res.send(`
      <p style="color:green">성공적으로 로그인 되었습니다.</p>
      <p>안녕하세요 ${req.session.userId}님!!</p>
      <button style="background-color: skyblue" onclick="location.href='/logout'">로그아웃</button>
      <button style="background-color: orange" onclick="location.href='/userinfo'">회원정보보기</button>
    `);
  } else {
    res.sendFile(`${__dirname}/e105.html`);
  }
});

app.get("/login", (req, res) => {
  res.sendFile(`${__dirname}/e105home.html`);
});

app.post("/login", (req, res) => {
  const { un, pw } = req.body; // get방식은 Query
  //console.log(typeof un, un, typeof pw, pw);
  //const Exg = /^[A-Za-z0-9]@{1,8}/g
  //const i=Exg.test(un); //true or false 변환 방법1 문법1
  const idOK = /^[A-Za-z0-9]{1,8}$/g.test(un); //방법 1 문법2
  const pwOK = pw.match(/^[A-Za-z0-9]{1,8}$/g); //방법 2
  console.log(`idOK : ${idOK} pwOK : ${pwOK}`);
  console.log(`idOK : ${idOK} pwOK : ${!!pwOK}`);

  if (idOK && !!pwOK) {
    if (un === "people" && pw == "123456") {
      req.session.loggedIn = true;
      req.session.username = un;
      res.redirect("/");
    } else {
      res.send(
        `<h3>성공적으로 로그인 되었습니다.</h3><button onclick="location.href='/' ">로그인창으로</button>`
      );
    }
  } else {
    res.send(`<script>
        alert("로그인이 필요합니다. 메시지출력");
        window.location.href='/login';
        </script>`);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((e) => {
    if (e) console.error(e);
    res.send(
      `<script>alert('세션종료 및 로그아웃 확인 알림창');window.location.href='/'</script>`
    );
  });
});

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port} 로 서비스 중입니다.`);
});
