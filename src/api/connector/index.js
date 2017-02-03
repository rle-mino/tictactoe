/* eslint-disable no-param-reassign */
import { loginfo, logerror } from '../util';
import {
  start,
  left,
  joined,
  yourTurn,
  pieceSet,
  otherReady,
  end,
} from './actions';
import {
  JOINED,
  JOIN,
  ERROR,
  READY,
  PUT_PIECE,
  REPLAY,
  START,
  YOUR_TURN,
  PIECE_SET,
  END,
  LEFT,
  ACTION,
} from '../../constants/socket';

const setupSocket = (socket, game, player, listeners) => {
  socket.game = game;
  socket.player = player;

  listeners.push({ event: START, cb: start(socket) });
  listeners.push({ event: LEFT, cb: left(socket) });
  listeners.push({ event: JOINED, cb: joined(socket, game, player) });
  listeners.push({ event: YOUR_TURN, cb: yourTurn(socket) });
  listeners.push({ event: PIECE_SET, cb: pieceSet(socket) });
  listeners.push({ event: END, cb: end(socket) });
  listeners.push({ event: READY, cb: otherReady(socket) });

  listeners.forEach(listener => game.on(listener.event, listener.cb));
};

const successJoin = (socket, listeners) => ({ game, player }) => {
  socket.emit(ACTION, {
    type: JOINED,
    payload: {
      id: game.id,
      me: player,
      him: game.getOtherPlayer(player),
    },
  });
  setupSocket(socket, game, player, listeners);
};

const catchRequest = socket => ({ details }) => {
  socket.emit(ACTION, { type: ERROR, payload: details });
};

const connector = (io, organizer) => {
  io.on('connection', (socket) => {
    const listeners = [];
    socket.on(JOIN, (data) => {
      organizer.joinGame(data)
        .then(successJoin(socket, listeners))
        .catch(catchRequest(socket));
    });

    socket.on(READY, () => {
      const { game, player } = socket;
      organizer.setAsReady(game, player)
        .catch(catchRequest(socket));
    });

    socket.on(PUT_PIECE, (index) => {
      const { game, player } = socket;
      organizer.putPiece(game, player, index)
        .catch(catchRequest(socket));
    });

    socket.on(REPLAY, () => {
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
