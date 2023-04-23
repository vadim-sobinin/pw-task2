import React from 'react';
import styled from 'styled-components';
import { Board } from './components/boardComponents/Board';
import { Header } from './components/Header';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const AppWrapper = styled.div`
  width: 100%;
  max-height: 100vh;
  height: 100vh;
  overflow: auto;
  background: #0077c3;
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Header />
        <Board />
      </AppWrapper>
    </Provider>
  );
};

export default App;
