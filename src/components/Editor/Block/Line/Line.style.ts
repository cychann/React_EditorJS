import styled from "styled-components";

export const Hr = styled.hr<{
  $imageUrl: string;
  $imagePosition: string;
  $align: "left" | "center";
}>`
  height: 18px;
  background-image: ${({ $imageUrl }) => `url(${$imageUrl})`};
  background-repeat: no-repeat;
  background-position: ${({ $align, $imagePosition }) =>
    $align === "center" ? "50% 50%" : $imagePosition};
`;
