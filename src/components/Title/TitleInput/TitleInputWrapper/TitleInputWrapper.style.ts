import React from "react";
import styled from "styled-components";

interface TitleInputDivProps extends React.HTMLAttributes<HTMLDivElement> {
  $align: "left" | "center";
  $hasBackground: boolean;
}

export const TitleInputWrapper = styled.div<TitleInputDivProps>`
  font-family: "Georgia";
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 1;

  ${({ $align, $hasBackground }) =>
    $align === "left" &&
    !$hasBackground &&
    `
    bottom: 50px;

  `}

  ${({ $align, $hasBackground }) =>
    $align === "left" &&
    $hasBackground &&
    `
    bottom: 70px;
      transition: all ease-in-out 0.2s;

  `}

  ${({ $align }) =>
    $align === "center" &&
    `
    bottom: 50%;
    text-align: center;
  `}
`;
