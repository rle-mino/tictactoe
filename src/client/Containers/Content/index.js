import React, { PropTypes } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import colors from '../../colors.json';

const ContentContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
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
`;

const Cell = styled.li`
  flex-basis: 33.33%;
  height: 20vh;
  line-height: 20vh;
  vertical-align: middle;
  cursor: pointer;
  text-align: center;
  transition: all .2s;

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
  font-size: 600%;
`;


const Cross = () => <SpeChar higher>&#10010;</SpeChar>;
const Circle = () => <SpeChar>&#x025CB;</SpeChar>;

const drawCells = (map, dispatch) => _.map(map, (cell, key) =>
  <Cell key={key}>
    {(cell === 1 && <Cross />) || (cell === 2 && <Circle />)}
  </Cell>
);

const Content = ({ map, dispatch }) =>
  <ContentContainer>
    <MapContainer>
      <Top />
      <Left />
      <Right />
      <Bottom />
      {drawCells(map, dispatch)}
    </MapContainer>
  </ContentContainer>
;

Content.propTypes = {
  map: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = ({ map }) => ({ map });

export default connect(mapStateToProps)(Content);
