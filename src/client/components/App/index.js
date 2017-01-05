import React from 'react';

import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../../Containers/Content';

const Layout = styled.div`
  padding: 0;
  margin: 0;
  display:flex;
  flex-direction: column;
  height: 100vh;
  background-color: #F5F5F5;
`;

const App = () =>
  <Layout>
    <Header />
    <Content />
    <Footer />
  </Layout>
;

/*
src
|-- components
  |-- AComponent
  |-- ASecondComponent
  |-- ...
|-- containers
  |-- AContainer
  |-- ASecondContainer
|-- modules
  |-- index.js (all the modules exported as a single object)
  |-- AModule (which includes the reducer (export default) and he's actions (export))
  |-- ASecondModule (same as before)
*/

export default App;
