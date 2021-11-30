import React from 'react';
import { render } from 'react-dom';

import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import App from './App';

render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);
