/* eslint-disable no-param-reassign */
import { loginfo, logerror } from '../util';
import gameEvent from './gameEvent';

const setupSocket = (socket, game, player, listeners) => {
  socket.game = game;
  socket.player = player;

  listeners.push({ event: 'start', cb: gameEvent.start(socket) });
  listeners.push({ event: 'leaved', cb: gameEvent.leaved(socket) });
  listeners.push({ event: 'joined', cb: gameEvent.joined(socket, game, player) });
  listeners.push({ event: 'your turn', cb: gameEvent.yourTurn(socket) });
  listeners.push({ event: 'piece set', cb: gameEvent.pieceSet(socket) });
  listeners.push({ event: 'end', cb: gameEvent.end(socket) });

  listeners.forEach(listener => game.on(listener.event, listener.cb));
};

const successJoin = (socket, listeners) => ({ game, player }) => {
  socket.emit('game:joined', {
    id: game.id,
    me: player,
    him: game.getOtherPlayer(player),
  });
  setupSocket(socket, game, player, listeners);
};

const catchRequest = socket => ({ details }) => {
  socket.emit('game:error', details);
};

const connector = (io, organizer) => {
  io.on('connection', (socket) => {
    const listeners = [];
    socket.on('game:join', (data) => {
      organizer.joinGame(data)
        .then(successJoin(socket, listeners))
        .catch(catchRequest(socket));
    });

    socket.on('game:ready', () => {
      const { game, player } = socket;
      organizer.setAsReady(game, player)
        .catch(catchRequest(socket));
    });

    socket.on('game:put piece', (index) => {
      const { game, player } = socket;
      organizer.putPiece(game, player, index)
        .catch(catchRequest(socket));
    });

    socket.on('game:replay', () => {
      const { game, player } = socket;
      organizer.setAsReady(game, player)
      .catch(catchRequest(socket));
    });

    socket.on('disconnect', () => {
      const { game, player } = socket;
      if (game) {
        listeners.forEach(listener => game.removeListener(listener.event, listener.cb));
      }
      organizer.leaveGame(game, player)
        .then(loginfo)
        .catch(logerror);
    });
  });
};

export default connector;
