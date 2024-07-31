const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const port = 3000;
const _path = path.join(__dirname, "/");

app.use(express.json()); //JSON 데이터 생성 res.body에 저장
app.use(express.urlencoded({ extended: true })); //확장개념 본문을 파싱

app.use("/", express.static(_path));

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, _path); // 경로를 같은 폴더에 설정
  },
  __filename: (req, res, cb) => {
    let fix = Buffer.from(res.originalname, "latin1").toString("utf8"); //파일명, 한글 깨짐 방지
    cb(null, fix); //오리지널 네임
  },
});

let upload = multer({ storage }); //multer의 옵션을 오브젝트로 설정

app.post("/up", upload.single("ufile"), (req, res) => {
  console.log(req.file);
});

// app.get("/", (req, res) => {
//   res.send();
// });

app.get("/list", (req, res) => {
  fs.readdir(_path, "utf-8", (err, data) => {
    let list =
      "<div style='text-align: center;'><h1 style='color: blue; border: 2px solid blue; padding: 10px; display: inline-block; background-color: lightblue; border-radius: 10px;'>파일 다운로드 및 업로드</h1><h2><ul style='list-style-type: none;'>";
    data.forEach(
      (v) =>
        (list += ` <li style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 10px; background-color: #add8e6;"><a href="${v}">${v}</a><a href="${v}"style ="text-decoreation-line:none;"download>[Download]</a></li>`)
    );
    list += `</ul></h2><form action="/up" method="POST" enctype="multipart/form-data" class="input-group mb-3">
    <input type="file" class="form-control" id="inputGroupFile02" name="ufile">
    <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
     type="submit" id="inputGroupFileAddon04">Button</button>
</form>`;
    res.send(list);
  });
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
