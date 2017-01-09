const createRoom = (roomID, socket) => {
  console.log(socket.id, roomID);
};

const eventHandler = socket => (action) => {
  switch (action.type) {
    case 'server/CREATE_OR_JOIN_ROOM':
      return createRoom(action.payload, socket);
    default:
      return null;
  }
};

const socketHandler = (socket) => {
  socket.on('action', eventHandler(socket));
};

export default socketHandler;
