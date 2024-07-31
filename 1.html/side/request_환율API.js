const express = require("express");
const app = express();
const port = 3000;
const url =
  "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=A15zesNdILoAWwVIBfSHtbeX2jOrSO7L&data=AP01";

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}`);
});
