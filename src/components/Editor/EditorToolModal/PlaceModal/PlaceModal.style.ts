import styled from "styled-components";
import { COMMON_THEME } from "styles/Theme";

export const PlaceModalWrapper = styled.div`
  width: 358px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlaceInputWrapper = styled.div`
  width: calc(100% - 40px);
  border-bottom: 1px solid ${COMMON_THEME.dark_gray};
  padding: 20px 20px 12px 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PlaceIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PlaceSearchInput = styled.input`
  width: 250px;
  color: ${COMMON_THEME.black_primary};
  font-size: 18px;
`;

export const PlaceInputClearIcon = styled.button`
  width: 25px;
  height: 25px;
  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/ico_editor_layer_v1.png");
  background-repeat: no-repeat;
  background-position: -30px -30px;
`;

export const PlaceSearchIcon = styled.button`
  width: 25px;
  height: 25px;
  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/ico_editor_layer_v1.png");
  background-repeat: no-repeat;
  background-position: 0 -30px;
`;

export const PlaceListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  width: 100%;
  height: 331px;
  overflow-y: scroll;
`;

export const PlaceItemContainer = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: ${COMMON_THEME.light_gray};
  }
`;

export const PlaceItem = styled.li`
  width: calc(100% - 40px);
  padding: 16px 6px 16px 6px;
  border-bottom: 1px solid ${COMMON_THEME.light_gray};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PlaceName = styled.p`
  color: ${COMMON_THEME.black_primary};
  font-size: 16px;
`;

export const HighlightText = styled.span`
  color: ${COMMON_THEME.primary};
  font-weight: bold;
`;

export const PlaceAddress = styled.p`
  color: ${COMMON_THEME.medium_gray};
  font-size: 12px;
`;

export const NoResultsWrapper = styled.div`
  width: 100%;
  height: 331px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlaceTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const PlaceIcon = styled.div`
  width: 42px;
  height: 62px;
  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/ico_editor_layer_v1.png");
  background-repeat: no-repeat;
  background-position: -60px 0;
`;

export const PlaceHelpText = styled.p`
  font-size: 14px;
  color: ${COMMON_THEME.medium_gray};
`;
