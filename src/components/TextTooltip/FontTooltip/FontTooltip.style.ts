import styled from "styled-components";
import { COMMON_THEME } from "styles/Theme";
export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 118px;

  font-size: 14px;
`;

export const DropdownHeader = styled.div<{
  isDropdownOpen: boolean;
}>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ isDropdownOpen }) =>
    isDropdownOpen
      ? `${COMMON_THEME.off_white}`
      : `${COMMON_THEME.white_primary}`};
`;

export const DropdownIcon = styled.span<{
  isDropdownOpen: boolean;
}>`
  height: 5px;
  width: 7px;

  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/ico_stylebar.v4.png");
  background-repeat: no-repeat;
  transform: ${({ isDropdownOpen }) =>
    isDropdownOpen ? "rotateX(180deg)" : "none"};
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: -1px;
  padding: 16px;
  width: calc(100% + 2px);
  border: 1px solid ${COMMON_THEME.gray_primary};
  background-color: ${COMMON_THEME.white_primary};
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DropdownItem = styled.div<{
  fontFamily: string;
}>`
  font-family: ${({ fontFamily }) => fontFamily};

  cursor: pointer;
  background-color: ${COMMON_THEME.white_primary};

  &:hover {
    color: ${COMMON_THEME.text_active};
  }
`;
