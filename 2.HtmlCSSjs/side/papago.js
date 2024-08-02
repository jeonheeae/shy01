const dotenv = require("dotenv");
dotenv.config();

// const express = require("express");
// const app = express();

const request = require("request");

const nid = process.env.nid;
const npw = process.env.npw;

const query =
  "https://www.google.com/search?q=+%EC%98%A4%EB%8A%98%EC%9D%98+%EB%82%A0%EC%94%A8&sca_esv=63fea97d1001d15f&hl=ko&source=hp&ei=dtKqZs-GA97h2roP9bmh-As&iflsig=AL9hbdgAAAAAZqrghoQGenQc9riqk31mm88q-1W63C2r&ved=0ahUKEwjPmYfPwNKHAxXesFYBHfVcCL8Q4dUDCBg&uact=5&oq=+%EC%98%A4%EB%8A%98%EC%9D%98+%EB%82%A0%EC%94%A8&gs_lp=Egdnd3Mtd2l6IhEg7Jik64qY7J2YIOuCoOyUqDINEAAYgAQYsQMYRhiAAjIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEiU8OcBUM4UWM_u5wFwCngAkAEAmAGmAaABhA-qAQQxOC4yuAEDyAEA-AEBmAISoAKnC6gCAMICCxAAGIAEGLEDGIMBwgIEEAAYA8ICERAuGIAEGLEDGNEDGIMBGMcBwgIEEC4YA8ICCBAAGIAEGLEDwgINEC4YgAQY0QMYxwEYCsICBxAAGIAEGArCAgYQABgDGArCAgsQLhiABBjRAxjHAZgDApIHBDExLjegB8ajAQ&sclient=gws-wiz";
const url = "https://openapi.naver.com/v1/util/shorturl";
const option = {
  url,
  form: { url: query },
  headers: {
    "X-Naver-Client-Id": nid,
    "X-Naver-Client-Secret": npw,
  },
};

request.post(option, (err, res, body) => {
  console.log(body);
});
