import styled from "styled-components";
import { COMMON_THEME } from "styles/Theme";

export const EmojiModalWrapper = styled.div`
  width: 358px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const EmojiListWrapper = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(13, 22px);
  grid-gap: 6px;
`;

export const EmojiItem = styled.li`
  cursor: pointer;
  list-style: none;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  color: ${COMMON_THEME.white_primary};
  background-color: ${COMMON_THEME.primary};
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: ${COMMON_THEME.light_gray};
    cursor: not-allowed;
  }
`;
