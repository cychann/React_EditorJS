import styled, { keyframes } from "styled-components";
import { COMMON_THEME } from "styles/Theme";

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const TooltipWrapper = styled.div<{
  $visible: boolean;
  $left: number;
  $top: number;
}>`
  position: absolute;
  border: 1px solid ${COMMON_THEME.gray_primary};
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-top: 2px solid ${COMMON_THEME.black_primary};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transition: visibility 0.1s ease-in-out;
  background-color: ${COMMON_THEME.white_primary};
  z-index: 10;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;

  animation: ${({ $visible }) => ($visible ? slideDown : "")} 0.2s ease-in-out
    forwards;
`;
