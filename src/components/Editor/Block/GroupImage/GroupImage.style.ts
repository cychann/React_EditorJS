import styled, { css, keyframes } from "styled-components";

export const GroupImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const scaleUp = keyframes`
  0% {
    transform: scale(0.8); 
  }
  100% {
    transform: scale(1); 
  }
`;

export const GroupImageItem = styled.img<{
  $isDragOver?: boolean;
  $isDropped?: boolean;
}>`
  width: 100%;
  height: 400px;
  object-fit: cover;
  cursor: pointer;
  transition: border 0.2s ease-in-out;
  border: ${(props) => (props.$isDragOver ? "2px dashed #4a90e2" : "none")};
  ${(props) =>
    props.$isDropped &&
    css`
      animation: ${scaleUp} 0.2s ease-in-out;
    `}
`;
