import express from 'express';
import http from 'http';
import SocketIO, {Socket} from "socket.io";

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);
const port = 8080;

app.get('/', function (request: express.Request, response: express.Response) {
  response.sendFile(__dirname + '/frontend/index.html');
});

io.on('connection', function (socket:Socket) {
  console.log('someone connected');

  socket.broadcast.emit('Hi, Welcome to nChat - Nodes x NodeJS Coding Night');

  socket.on('chat message', function(msg){
    console.log('Message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(port,  () => {
  console.log(`Server running at ${port}/`);
});
