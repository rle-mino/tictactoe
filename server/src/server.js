import http from 'http';
import socketIo from 'socket.io';
import 'dotenv/config';
import socketHandler from './socketHandler';

const server = http.createServer();
const io = socketIo(server);

io.on('connection', socketHandler);

server.listen(process.env.SERVER_PORT, () => {
  console.log('SERVER RUNNING'); // eslint-disable-line no-console
});
