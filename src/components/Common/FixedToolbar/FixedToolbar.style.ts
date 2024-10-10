import styled from "styled-components";

interface ToolbarProps {
  top: number;
  right: number;
}

export const FixedToolbarContainer = styled.div<ToolbarProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  position: fixed;
  top: ${(props) => props.top}px;
  right: ${(props) => props.right}%;
`;
