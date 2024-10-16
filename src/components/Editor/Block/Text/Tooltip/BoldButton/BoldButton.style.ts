import styled from "styled-components";
import { COMMON_THEME } from "styles/Theme";

export const BoldButtonContainer = styled.div<{
  $isBold: boolean;
}>`
  cursor: pointer;
  padding: 6px;
  background-color: ${({ $isBold }) =>
    $isBold ? COMMON_THEME.off_white : COMMON_THEME.white_primary};
`;

export const BoldButton = styled.button<{
  $isBold: boolean;
}>`
  width: 25px;
  height: 25px;
  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/ico_stylebar.v4.png");
  background-repeat: no-repeat;
  background-position: 2px -27px;
  background-position: ${({ $isBold }) =>
    $isBold ? "-28px -27px" : "2px -27px"};

  &:hover {
    background-position: -28px -27px;
  }
`;
