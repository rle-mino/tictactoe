import initServer from './server';
import createOrganizer from './organizer';
import config from '../../config';

const organizer = createOrganizer();
initServer(organizer, config)
  .then(port => console.log(`application started on port ${port}`)); // eslint-disable-line no-console
