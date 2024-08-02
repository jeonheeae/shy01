const exprees = reqire("express");
const app = exprees();
const port = 3000;

const_path = __dirname;

app.get("/", () => {
  res.sendFile();
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
