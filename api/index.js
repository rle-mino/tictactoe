import 'dotenv/config';
import server from './server';

const port = process.env.SERVER_PORT;

server.listen(port, () => {
  console.log(`application started on port ${port}`); // eslint-disable-line no-console
});
