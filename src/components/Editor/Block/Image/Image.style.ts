import styled from "styled-components";
import { COMMON_THEME } from "styles/Theme";

export const ImageContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const ImageSrc = styled.img<{
  $clicked: boolean;
}>`
  width: 100%;
  border: ${({ $clicked }) => $clicked && "2px solid #00b8b2"};
`;

export const CaptionInput = styled.input`
  text-align: center;
  color: ${COMMON_THEME.dark_gray};

  &::placeholder {
    color: ${COMMON_THEME.dark_gray}; // 원하는 placeholder 색상 설정
    opacity: 0.6; // opacity를 조정하여 색상 투명도 조절 가능
  }
`;
