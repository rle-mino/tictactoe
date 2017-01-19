import actions from './actions';

const organizer = {
  games: [],
  ...actions,
};

const createOrganizer = () => Object.create(organizer);

export default createOrganizer;
