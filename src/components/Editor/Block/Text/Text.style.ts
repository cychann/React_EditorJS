import styled from "styled-components";

export const TextContainer = styled.div`
  position: relative;
`;

export const TextContentEditable = styled.p<{
  $textAlign: string;
}>`
  border: none;
  outline: none;
  text-align: ${({ $textAlign }) => $textAlign};
`;
