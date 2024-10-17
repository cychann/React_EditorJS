import styled from "styled-components";
import { COMMON_THEME } from "styles/Theme";

export const VideoContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const VideoSrc = styled.video<{
  $clicked: boolean;
}>`
  width: 100%;
  border: ${({ $clicked }) => $clicked && "2px solid #00b8b2"};
`;

export const CaptionInput = styled.input`
  text-align: center;
  color: ${COMMON_THEME.dark_gray};

  &::placeholder {
    color: ${COMMON_THEME.dark_gray};
    opacity: 0.6;
  }
`;
