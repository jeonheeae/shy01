const express = require("express");
const logger = require("morgan");
const app = express();
const port = 3000;
app.use(logger("tiny"));

app.length("/", (res, (req) => {}));

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중...`);
});
