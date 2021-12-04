import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    margin: 0;
  }

  body {
    font-family: 'Noto Sans KR';
    -webkit-font-smoothing: antialiased;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    display: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border: 0;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  a,
  button,
  select {
    cursor: pointer;
  }

  input,
  textarea {
    color: inherit;
    -webkit-appearance: none;
    -webkit-border-radius: 0;
    cursor: text;

    &:disabled {
      font-weight: 700;
    }
  }

  ul,
  ol {
    padding-left: 0;
  }

  mark {
    color: inherit;
    background-color: inherit;
  }
`;

export default GlobalStyle;
