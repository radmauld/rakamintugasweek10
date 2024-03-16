const express = require("express");
const app = express();
const port = 3000;
var pool = require("./queries.js");

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// pool.connect((err, res) => {
//     console.log(err)
//     console.log('connected')
// });

app.listen(3000);
