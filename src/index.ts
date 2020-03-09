import cookieParser from 'cookie-parser';
import express from 'express';
import { Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import ApiRouter from './backend/routes/api';
import http from 'http';
import SocketIO, {Socket} from "socket.io";

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);
const port = 8080;

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api', ApiRouter);

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

const staticDir = path.join(__dirname, 'frontend/build');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

server.listen(port,  () => {
  console.log(`Server running at ${port}/`);
});

/**
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
 */
