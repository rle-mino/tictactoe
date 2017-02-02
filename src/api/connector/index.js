/* eslint-disable no-param-reassign */
import { loginfo, logerror } from '../util';
import gameEvent from './gameEvent';
import {
  SOCKET_JOINED,
  SOCKET_JOIN,
  SOCKET_ERROR,
  SOCKET_READY,
  SOCKET_PUT_PIECE,
  SOCKET_REPLAY,
} from '../../constants/socket';
import {
  START,
  LEFT,
  JOINED,
  YOUR_TURN,
  PIECE_SET,
  END,
  READY,
} from '../../constants/game';

const setupSocket = (socket, game, player, listeners) => {
  socket.game = game;
  socket.player = player;

  listeners.push({ event: START, cb: gameEvent.start(socket) });
  listeners.push({ event: LEFT, cb: gameEvent.left(socket) });
  listeners.push({ event: JOINED, cb: gameEvent.joined(socket, game, player) });
  listeners.push({ event: YOUR_TURN, cb: gameEvent.yourTurn(socket) });
  listeners.push({ event: PIECE_SET, cb: gameEvent.pieceSet(socket) });
  listeners.push({ event: END, cb: gameEvent.end(socket) });
  listeners.push({ event: READY, cb: gameEvent.otherReady(socket) });

  listeners.forEach(listener => game.on(listener.event, listener.cb));
};

const successJoin = (socket, listeners) => ({ game, player }) => {
  socket.emit(SOCKET_JOINED, {
    id: game.id,
    me: player,
    him: game.getOtherPlayer(player),
  });
  setupSocket(socket, game, player, listeners);
};

const catchRequest = socket => ({ details }) => {
  socket.emit(SOCKET_ERROR, details);
};

const connector = (io, organizer) => {
  io.on('connection', (socket) => {
    const listeners = [];
    socket.on(SOCKET_JOIN, (data) => {
      organizer.joinGame(data)
        .then(successJoin(socket, listeners))
        .catch(catchRequest(socket));
    });

    socket.on(SOCKET_READY, () => {
      const { game, player } = socket;
      organizer.setAsReady(game, player)
        .catch(catchRequest(socket));
    });

    socket.on(SOCKET_PUT_PIECE, (index) => {
      const { game, player } = socket;
      organizer.putPiece(game, player, index)
        .catch(catchRequest(socket));
    });

    socket.on(SOCKET_REPLAY, () => {
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
