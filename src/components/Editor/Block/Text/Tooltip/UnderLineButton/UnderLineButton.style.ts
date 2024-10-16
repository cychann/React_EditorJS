import { styled } from "styled-components";
import { COMMON_THEME } from "styles/Theme";

export const UnderLineButtonConatiner = styled.div<{
  $isUnderLine: boolean;
}>`
  cursor: pointer;
  padding: 6px;
  background-color: ${({ $isUnderLine }) =>
    $isUnderLine ? COMMON_THEME.off_white : COMMON_THEME.white_primary};
`;

export const UnderLineButton = styled.button<{ $isUnderLine: boolean }>`
  width: 25px;
  height: 25px;
  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/ico_stylebar.v4.png");
  background-repeat: no-repeat;
  background-position: 2px -27px;
  background-position: ${({ $isUnderLine }) =>
    $isUnderLine ? "-88px -27px" : "-58px -27px"};

  &:hover {
    background-position: -88px -27px;
  }
`;
