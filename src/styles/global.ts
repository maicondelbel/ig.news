import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  // Global Styles CSS
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    background: ${(props) => props.theme['--gray-900']};
    color: ${(props) => props.theme['--gray-300']};
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', sans-serif;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${(props) => props.theme['--gray-100']};
  }

  h1 {
    font-weight: 900;
    font-size: 4.5rem;
    line-height: 4.5rem;
  }

  h2 {
    line-height: 2.125rem;
  }
  
  p {
    line-height: 1.625rem;
  }

  button {
    all: unset;
    cursor: pointer;
  }
`
