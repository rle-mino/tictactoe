import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import colors from '../../colors.json';
import { dispatchPutPiece } from '../../modules/game';

const ContentContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapContainer = styled.ul`
  height: 60vh;
  width: 60vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  padding: 0;
  margin: 0;
  border: 1px solid black;
`;

const Cell = styled.li`
  flex-basis: 33.33%;
  height: 20vh;
  line-height: 20vh;
  vertical-align: middle;
  cursor: pointer;
  text-align: center;
  transition: all .2s;
  list-style: none;

  &:hover {
    background-color: ${colors.lightBlue};
    color: white;
  }
`;

const Top = styled.span`
  position: absolute;
  background-color: black;
  left: 0%;
  top: 33.333%;
  width: 100%;
  height: 1px;
`;

const Bottom = styled.span`
  position: absolute;
  background-color: black;
  left: 0%;
  top: 66.666%;
  width: 100%;
  height: 1px;
`;

const Left = styled.span`
  position: absolute;
  background-color: black;
  top: 0%;
  left: 33.333%;
  height: 100%;
  width: 1px;
`;

const Right = styled.span`
  position: absolute;
  background-color: black;
  top: 0%;
  left: 66.666%;
  height: 100%;
  width: 1px;
`;

const SpeChar = styled.span`
  font-size: ${props => (props.higher ? '1000%' : '600%')};
`;

const WinnerDisplay = styled.h4`
  font-size: 50px;
  height: 40px;
  margin: 30px 0 50px 0;
  padding: 0;
`;


const Cross = () => <SpeChar>&#10010;</SpeChar>;
const Circle = () => <SpeChar higher>&#x025CB;</SpeChar>;

const drawCells = (game, dispatch) => game.map.map((cell, key) => {
  const putSymbol = () => {
    dispatch(dispatchPutPiece(key));
  };

  return (
    <Cell key={key} onClick={putSymbol}>
      {(cell === 1 && <Cross />) || (cell === 2 && <Circle />)}
    </Cell>
  );
});

const Content = ({ game, dispatch }) =>
  <ContentContainer>
    <WinnerDisplay>
      {(game.win && `PLAYER ${game.win} WINS`) || (game.full && 'DRAW')}
    </WinnerDisplay>
    <MapContainer>
      <Top />
      <Left />
      <Right />
      <Bottom />
      {drawCells(game, dispatch)}
    </MapContainer>
  </ContentContainer>
;

Content.propTypes = {
  game: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = ({ game }) => ({ game });

export default connect(mapStateToProps)(Content);
