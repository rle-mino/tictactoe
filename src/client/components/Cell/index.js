/* eslint "react/no-array-index-key": "off" */
import React from 'react';
import styled from 'styled-components';
import R from 'ramda';
import colors from '../../colors.json';
import { Cross, Circle } from '../../components/SpeChars';

export const Cell = styled.li`
  flex-basis: 33.33%;
  height: 33.33%;
  line-height: 20vh;
  vertical-align: middle;
  cursor: ${props => (props.playing ? 'pointer' : 'default')};
  text-align: center;
  transition: all .2s;
  list-style: none;

  &:hover {
    background-color: ${props => (props.playing ? colors.lightBlue : 'transparent')};
    color: ${props => (props.playing ? 'white' : 'black')};
  }
`;

const drawCells = (game, putPiece) => game.board.map((cell, key) => {
  const { me, him, playing } = game.player;
  const requestPut = () => {
    if (playing.name === me.name) {
      putPiece(key);
    }
  };

  return (
    <Cell key={key} onClick={requestPut} playing={playing.name === me.name}>
      {(R.equals((cell || {}).name, me.name) && <Cross />)
      ||
      (R.equals((cell || {}).name, him.name) && <Circle />)}
    </Cell>
  );
});

export default drawCells;
