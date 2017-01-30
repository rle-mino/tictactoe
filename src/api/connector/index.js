/* eslint-disable no-param-reassign */
import { loginfo, logerror } from '../util';
import gameEvent from './gameEvent';

const setupSocket = (socket, game, player, events) => {
  socket.game = game;
  socket.player = player;
  events.start = gameEvent.start(socket);
  events.leaved = gameEvent.leaved(socket);
  events.joined = gameEvent.joined(socket, game, player);
  events.yourTurn = gameEvent.yourTurn(socket);
  game.on('start', events.start);
  game.on('leaved', events.leaved);
  game.on('joined', events.joined);
  game.on('your turn', events.yourTurn);
};

const successJoin = (socket, events) => ({ game, player }) => {
  socket.emit('game:joined', {
    id: game.id,
    me: player,
    him: game.getOtherPlayer(player),
  });
  setupSocket(socket, game, player, events);
};

const catchRequest = socket => ({ details }) => {
  socket.emit('game:error', details);
};

const connector = (io, organizer) => {
  io.on('connection', (socket) => {
    const events = {};
    socket.on('game:join', (data) => {
      organizer.joinGame(data)
        .then(successJoin(socket, events))
        .catch(catchRequest(socket));
    });

    socket.on('game:ready', () => {
      const { game, player } = socket;
      organizer.setAsReady(game, player)
        .catch(catchRequest(socket));
    });

    socket.on('disconnect', () => {
      const { game, player } = socket;
      if (game) {
        game.removeListener('joined', events.joined);
        game.removeListener('start', events.start);
        game.removeListener('leaved', events.leaved);
        game.removeListener('your turn', events.yourTurn);
      }
      organizer.leaveGame(game, player)
        .then(loginfo)
        .catch(logerror);
    });
  });
};

export default connector;
