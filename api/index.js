import app from './app';

const port = app.get('port');
const host = app.get('host');
const server = app.listen(port);

server.on('listening', () => {
  console.log(`application started on ${host}:${port}`); // eslint-disable-line no-console
});
