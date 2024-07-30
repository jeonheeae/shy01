const express = require("express");
const logger = require("morgan");
const app = express();
const port = 3000;

app.use(logger("tiny"));

app.get("/", (req, res) => {
  res.send("반가워요");
});

app.get("/book/:uname/:bname/:date", (req, res) => {
  console.log(req.params);
  res.send(
    "<h1>저자:" +
      req.params.uname +
      "</h1><h2>도서명:" +
      req.params.bname +
      "</h2><h2>출판일:" +
      req.params.date +
      "</h2>"
  );
});

app.listen(port, () => {
  console.log(port + "번 포트에서 서버가 성공적으로 시작되었습니다.");
});
