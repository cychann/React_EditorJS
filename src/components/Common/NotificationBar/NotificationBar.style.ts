import styled from "styled-components";
import { COMMON_THEME } from "styles/Theme";

export const NotificationBarContainer = styled.div<{ isVisible: boolean }>`
  width: 100vw;
  height: ${({ isVisible }) => (isVisible ? "61px" : "0")};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  overflow: hidden;
  transition: all 0.5s ease;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COMMON_THEME.white_primary};
  background-color: #00c6be;
`;
