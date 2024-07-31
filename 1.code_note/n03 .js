const http = require("http"); //http 모듈 사용
const port = 3030;
const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/plain; charset=UTF-8");
  const obj = { 이름: "홍길동", age: 23 }; //자바 스크립트 방식
  console.log(1, obj);
  console.log(2, JSON.stringify(obj)); //Object를 JSON 형태로 변환, Json을 Object로 변환
});

server.listen(port, () => {
  //server.listen(port,function(){
  console.log(`${port}포트에서 서버가 가동됨 ${port - 30}포트가 아님.`);
  //ES6 신 문법 백틱을 사용 : 탬블릿문자열, 탬플릿리터럴
});
