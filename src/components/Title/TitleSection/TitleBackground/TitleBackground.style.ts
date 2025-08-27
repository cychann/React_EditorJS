import { COMMON_THEME } from "@/styles/Theme";
import styled from "styled-components";

export const TitleSectionWrapper = styled.div<{
  $bgImage?: string | null;
  $bgColor?: string | null;
  $expanded?: boolean | null;
}>`
  width: 100%;
  height: ${({ $expanded }) => ($expanded ? "100vh" : "450px")};
  border-bottom: 1px solid ${COMMON_THEME.light_gray};
  background-color: ${({ $bgColor }) => $bgColor || "trasnparent"};
  background-image: ${({ $bgImage }) =>
    $bgImage ? `url(${$bgImage})` : "none"};
  background-size: cover;
  background-position: center;
  position: relative;
  transition: all ease-in-out 0.2s;
  ${({ $bgImage }) =>
    $bgImage &&
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
      `};
`;
