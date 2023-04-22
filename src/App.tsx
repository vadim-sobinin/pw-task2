import React from 'react';
import styled from 'styled-components';
import { Board } from './components/boardComponents/Board';
import { Header } from './components/Header';
import { AppContextProvider } from './context/AppContext';

const AppWrapper = styled.div`
  width: 100%;
  max-height: 100vh;
  height: 100vh;
  overflow: auto;
  background: #0077c3;
`;

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <AppWrapper>
        <Header />
        <Board />
      </AppWrapper>
    </AppContextProvider>
  );
};

export default App;
