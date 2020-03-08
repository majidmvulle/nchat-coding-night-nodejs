import {IncomingMessage, ServerResponse} from "http";

const http = require('http');

const port = 8080;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!');
});

server.listen(port,  () => {
  console.log(`Server running at ${port}/`);
});
