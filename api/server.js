import socketIo from 'socket.io';
import express from 'express';
import http from 'http';
import connector from './connector';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
connector(io);

export default server;
