import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
    -webkit-tap-highlight-color: transparent;
  }

  html,
  body,
  #root {
    height: 100%;
  }
  
  ul, ol, li {
    list-style: none;
  }

  input {
    border: none;
    outline: none;
  }

  textarea {
    resize: none;
    border: none;
    outline: none;
  }

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
  }

  ::-webkit-scrollbar-track {
    -webkit-appearance: none;
    &:hover {
      border-radius: 1rem;
    }
  }

  ::-webkit-scrollbar-thumb {
    min-height: 5rem;
    border-radius: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
  
  &::-webkit-scrollbar-button:vertical:start {
    display: block;
    height: 0.3rem;
  }

  &::-webkit-scrollbar-button:vertical:end {
    display: block;
    height: 0.3rem;
  }

  &::-webkit-scrollbar-button:horizontal:start {
    display: block;
    width: 0.2rem;
  }

  &::-webkit-scrollbar-button:horizontal:end {
    display: block;
    width: 0.2rem;
  }

  textarea::-webkit-scrollbar {
    width: 1em;
    max-height: 2rem;
}

`;
