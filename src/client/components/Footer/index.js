import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  font-size: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const Footer = () =>
  <FooterContainer>
    rle-mino - REDPELICANS
  </FooterContainer>

export default Footer;
