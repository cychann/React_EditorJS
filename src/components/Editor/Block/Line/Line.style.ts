import styled from "styled-components";
import { COMMON_THEME } from "styles/Theme";

export const Hr = styled.hr<{
  $imageUrl: string;
  $imagePosition: string;
  $align: "left" | "center";
  $active: boolean;
}>`
  height: 18px;
  background-image: ${({ $imageUrl }) => `url(${$imageUrl})`};
  background-repeat: no-repeat;
  background-position: ${({ $align, $imagePosition }) =>
    $align === "center" ? "50% 50%" : $imagePosition};
  border: ${({ $active }) =>
    $active ? `2px solid ${COMMON_THEME.primary}` : "none"};
  cursor: pointer;
`;
