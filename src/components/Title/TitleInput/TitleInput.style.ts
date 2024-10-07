import React from "react";
import styled from "styled-components";

interface TitleInputDivProps extends React.HTMLAttributes<HTMLDivElement> {
  align: "left" | "center";
}

export const TitleInputWrapper = styled.div<TitleInputDivProps>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 1;

  ${({ align }) =>
    align === "left" &&
    `
    bottom: 50px;
  `}

  ${({ align }) =>
    align === "center" &&
    `
    bottom: 50%;
  `}
`;
