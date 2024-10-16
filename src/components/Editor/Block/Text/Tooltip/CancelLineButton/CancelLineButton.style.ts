import styled from "styled-components";
import { COMMON_THEME } from "styles/Theme";

export const UnderLineButtonConatiner = styled.div<{
  $isCancleLine: boolean;
}>`
  cursor: pointer;
  padding: 6px;
  background-color: ${({ $isCancleLine }) =>
    $isCancleLine ? COMMON_THEME.off_white : COMMON_THEME.white_primary};
`;

export const UnderLineButton = styled.button<{ $isCancleLine: boolean }>`
  width: 25px;
  height: 25px;
  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/ico_stylebar.v4.png");
  background-repeat: no-repeat;
  background-position: 2px -27px;
  background-position: ${({ $isCancleLine }) =>
    $isCancleLine ? "-148px -27px" : "-118px -27px"};

  &:hover {
    background-position: -148px -27px;
  }
`;
