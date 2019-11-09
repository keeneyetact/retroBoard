import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    touch-action: manipulation;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: white;
  }

  #content {
    background-color: white;
  }
`;

export default GlobalStyle;
