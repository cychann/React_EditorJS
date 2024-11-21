import { createGlobalStyle } from "styled-components";

/**
 * 전역 스타일 정의
 * 기본 스타일 초기화 및 공통 스타일 설정
 */
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
    -webkit-tap-highlight-color: transparent;
  }

  * {
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #d9d9d9;
      border-radius: 4px;
      
      &:hover {
        background-color: #bfbfbf;
      }
    }
  }

  /* Firefox 스크롤바 스타일링 */
  * {
    scrollbar-width: thin;
    scrollbar-color: #d9d9d9 transparent;
  }

  html {
    overflow-y: scroll;
  }


  html,
  body,
  #root {
    width: 100%;
    height: 100%;
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

  .ce-toolbar__plus {
    display: none;
  }

  .ce-block a {
    color: #00c6be;
  }

`;
