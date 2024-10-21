import styled from "styled-components";

export const Hr = styled.hr<{
  $imageUrl: string;
  $imagePosition: string;
}>`
  height: 18px;
  background-image: ${({ $imageUrl }) => `url(${$imageUrl})`};
  background-repeat: no-repeat;
  background-position: ${({ $imagePosition }) => $imagePosition};
`;
