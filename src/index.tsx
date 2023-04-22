import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import App from './App';

const Global = createGlobalStyle`

${normalize}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <Global />
    <App />
  </>,
);
