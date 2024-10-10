import styled from "styled-components";
import { COMMON_THEME } from "styles/Theme";

export const FontColorTooltipWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 9px 11px;
  cursor: pointer;
`;

export const ColorIcon = styled.div<{
  $isDropdownOpen: boolean;
  $fontColor: string;
}>`
  width: 20px;
  height: 20px;
  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/ico_stylebar.v4.png");
  background-repeat: no-repeat;
  background-position: 0 -60px;
  background-color: ${({ $fontColor }) => $fontColor};
`;

export const TitleColorList = styled.div`
  position: absolute;
  top: calc(100% + 1px);
  right: -1px;
  padding: 16px;
  border: 1px solid ${COMMON_THEME.gray_primary};
  background-color: ${COMMON_THEME.white_primary};
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const TitleColorItem = styled.div<{
  $colorItemColor: string;
  $isSelected: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/ico_stylebar.v4.png");
  background-repeat: no-repeat;
  background-position: ${({ $isSelected }) =>
    $isSelected ? "-55px 8px" : "-150px -90px"};
  background-color: ${({ $colorItemColor }) => $colorItemColor};
  border-radius: 50%;
  cursor: pointer;
`;
