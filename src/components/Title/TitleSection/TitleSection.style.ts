import styled from "styled-components";
import { commonTheme } from "styles/Theme";

interface TitleSectionWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  bgImage?: string | null;
}

export const TitleSectionWrapper = styled.div<TitleSectionWrapperProps>`
  width: 100%;
  height: 450px;
  border-bottom: 1px solid ${commonTheme.light_gray};
  background-image: ${({ bgImage }) => (bgImage ? `url(${bgImage})` : "none")};
  background-size: cover;
  background-position: center;
  position: relative;

  ${({ bgImage }) =>
    bgImage &&
    `
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1; 
      }
    `}
`;

export const TitleTopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 80px;
`;

export const TitleMenuWrapper = styled.div``;

export const TitleSaveWrapper = styled.div``;

export const TitleBottomWrapper = styled.div`
  width: 700px;
  height: 370px;
  margin: auto;
  position: relative;
`;
