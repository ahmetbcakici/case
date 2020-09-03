const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ msg: "test" })
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("Server is running")
})