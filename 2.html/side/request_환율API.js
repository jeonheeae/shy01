const dotenv = require("dotenv");
dotenv.config(); //환경변수 세팅완료
const express = require("express");
const request = require("request");
const app = express();
const port = 3000;
const ori = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?";
const auth = process.env.WON;
const query = `authkey=${auth}&data=AP01`;
const url = ori + query;
console.log(url);

request(url, (e, res, body) => {
  const result = JSON.parse(body);
  console.log(result);
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}`);
});
