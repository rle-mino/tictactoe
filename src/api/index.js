import server from './server';
import config from '../../config';

const { port } = config.api;

server.listen(port, () => {
  console.log(`application started on port ${port}`); // eslint-disable-line no-console
});
