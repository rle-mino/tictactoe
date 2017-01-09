import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { dispatchResetMap } from '../../modules/game';
import colors from '../../colors.json';

const ReButton = styled.button`
  display: ${props => (props.visible ? 'block' : 'none')};
  background-color: ${colors.lightBlue};
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  border: none;
  font-size: 40px;
  margin-left: 20px;
  transition: all .3s ease-out;
  cursor: pointer;

  &:hover {
    transform: rotateZ(180deg);
  }
`;

const ReplayButton = ({ visible, dispatch }) =>
  <ReButton visible={visible} onClick={() => dispatch(dispatchResetMap())}>
    &#x021BB;
  </ReButton>
;

ReplayButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ReplayButton;
