const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  // if (req.url){
  // }
  res.end();
})

server.listen(8081)