import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100vw;
  padding: 2em;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const MainTitle = styled.h1`
  font-size: 40px;
`;

const Header = () =>
  <HeaderContainer>
    <MainTitle>TicTacToe</MainTitle>
  </HeaderContainer>

export default Header;
