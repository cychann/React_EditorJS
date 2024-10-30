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
    width: 100%;
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

  /* 본고딕 */
@font-face {
  font-family: "NotoSans";
  src: url("/assets/fonts/NotoSansKR-Regular.woff2") format("woff2");
  font-weight: 400;
}

@font-face {
  font-family: "NotoSans";
  src: url("/assets/fonts/NotoSansKR-Bold.woff2") format("woff2");
  font-weight: 700;
}

/* 나눔명조 */
@font-face {
  font-family: "NanumMyeongjo";
  src: url("/assets/fonts/NanumMyeongjo.woff2") format("woff2");
  font-weight: 400;
}

@font-face {
  font-family: "NanumMyeongjo";
  src: url("/assets/fonts/NanumMyeongjoBold.woff2") format("woff2");
  font-weight: 700;
}


/* 나눔고딕 */
@font-face {
  font-family: "NanumGothic";
  src: url("/assets/fonts/NanumGothic.woff2") format("woff2");
  font-weight: 400;
}

@font-face {
  font-family: "NanumGothic";
  src: url("/assets/fonts/NanumGothicBold.woff2") format("woff2");
  font-weight: 700;
}

/* 나눔바른고딕 */
@font-face {
  font-family: "NanumBarunGothic";
  src: url("/assets/fonts/NanumBarunGothic.woff2") format("woff2");
  font-weight: 400;
}

@font-face {
  font-family: "NanumBarunGothic";
  src: url("/assets/fonts/NanumBarunGothicBold.woff2") format("woff2");
  font-weight: 700;
}

/* Helvetica */
@font-face {
  font-family: "Helvetica";
  src: url("/assets/fonts/Helvetica.woff2") format("woff2");
  font-weight: 400;
}

@font-face {
  font-family: "Helvetica";
  src: url("/assets/fonts/HelveticaBold.woff2") format("woff2");
  font-weight: 700;
}

/* Georgia */
@font-face {
  font-family: "Georgia";
  src: url("/assets/fonts/Georgia.woff2") format("woff2");
  font-weight: 400;
}

@font-face {
  font-family: "Georgia";
  src: url("/assets/fonts/GeorgiaBold.woff2") format("woff2");
  font-weight: 700;
}

body {
  font-family: 'Georgia';
}
`;
