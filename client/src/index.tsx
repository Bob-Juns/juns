import React from 'react';
import { render } from 'react-dom';

import GlobalStyle from './styles/GlobalStyle';
import App from './App';

render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root'),
);
