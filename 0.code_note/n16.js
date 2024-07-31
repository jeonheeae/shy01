const express = require("express");
const path = require("path");
const fs = require("fs");
const logger = require("morgan");

const app = express();
const port = 3000;
const _path = path.join(__dirname, "/");
app.use(logger("tiny"));
app.use("/", express.static(_path + "/html"));

app.get("/data", (req, res) => {
  const title = req.query.title;
  const content = req.query.content;
  fs.writeFile(_path + title + ".txt", content, (e) => {
    if (e) console.log(e);
    console.log(_path + "/save.txt");
    console.log("파일 작성이 완료 되었습니다.");
    console.log(title, content);
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
