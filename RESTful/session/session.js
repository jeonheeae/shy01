const express = require("express");
const session = require("express-session");
const app = express(`body-parser`);
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
