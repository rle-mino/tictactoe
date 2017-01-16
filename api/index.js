import app from './app';

const port = app.get('port');
const host = app.get('host');
const server = app.lisent(port);

console.log('------------------------------------------');

server.on('listen', () => {
  console.log(`application started on ${host}:${port}`); // eslint-disable-line no-console
});
