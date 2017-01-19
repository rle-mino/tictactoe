import createOrganizer from './organizer';

const connector = (io) => {
  const organizer = createOrganizer();

  io.on('connection', (socket) => {
    socket.on('game:join', (data) => {
      organizer.joinGame(data, socket.id)
        .then(console.log)
        .catch(console.error);
    });

    socket.on('disconnect', () => {
      organizer.leaveGame(socket.id)
        .then(console.log)
        .catch(console.error);
    });
  });
};

export default connector;
