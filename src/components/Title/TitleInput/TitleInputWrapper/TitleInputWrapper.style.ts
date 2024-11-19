import styled from "styled-components";

export const TitleInputWrapper = styled.div<{
  $align: "bottom" | "center";
  $hasBackground: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 100;

  ${({ $align, $hasBackground }) =>
    $align === "bottom" &&
    !$hasBackground &&
    `
    bottom: 50px;

  `}

  ${({ $align, $hasBackground }) =>
    $align === "bottom" &&
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
