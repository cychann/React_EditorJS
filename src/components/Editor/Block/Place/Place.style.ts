import styled from "styled-components";
import { COMMON_THEME } from "styles/Theme";

export const PlaceWrapper = styled.div`
  border: 1px solid ${COMMON_THEME.gray_primary};
  border-radius: 34px;
  width: 290px;
  height: 68px;
  padding: 8px 16px;
  font-size: 13px;
  color: ${COMMON_THEME.black_primary};
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

export const PlaceWrapperIcon = styled.div`
  width: 24px;
  height: 68px;
  background: url("https://t1.daumcdn.net/brunch/static/img/help/pc/ico_attach_place_1.png")
    no-repeat;
  background-position: 0px 19px;
`;

export const PlaceTextWrapper = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

export const PlaceName = styled.p`
  color: ${COMMON_THEME.black_primary};
  font-size: 18px;
`;

export const PlaceAddress = styled.p`
  color: ${COMMON_THEME.medium_gray};
  font-size: 12px;
`;
