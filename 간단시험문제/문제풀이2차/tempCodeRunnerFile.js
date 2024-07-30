let counter = 0;
/* 클릭시 디테일창 */
app.get("/detail", (req, res) => {
  const search = req.query.search;
  console.log(search);
  db.query(`SELECT * FROM tb2 WHERE num=${search}`, (err, results) => {
    res.send(`
      <div>${results[0].num}</div>
      <div>${results[0].title}</div>
      <div>${results[0].name}</div>
      <div>${results[0].content}</div>
      <div>${results[0].count}</div>
      `);
    counter = results[0].count + 1;
  });
  /* 카운트 부분*/
  db.query(
    `UPDATE tb2 SET count = ${counter} WHERE num=${search}`,
    (err, results) => {
      console.log("조회수증가:", counter);
    }
  );
});