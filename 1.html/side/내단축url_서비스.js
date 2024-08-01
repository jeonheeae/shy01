const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
        <html>
          <body>
            <h1>단축 URL 서비스</h1>
            <form action="/" method="post">
              <input type="text" name="longUrl" placeholder="긴 주소를 입력하세요">
              <button type="submit">단축 URL 생성</button>
            </form>
          </body>
        </html>
      `);
});

app.post("/", (req, res) => {
  const nid = process.env.nid;
  const npw = process.env.npw;
  const query = "";
  const url = "https://openapi.naver.com/v1/util/shorturl";
  const option = {
    url,
    form: { url: query },
    headers: {
      "X-Naver-Client-Id": nid,
      "X-Naver-Client-Secret": npw,
    },
  };

  request.post(option, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const result = JSON.parse(body);
      res.send(`<h2>단축 URL: ${result.result.url}</h2>`);
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
