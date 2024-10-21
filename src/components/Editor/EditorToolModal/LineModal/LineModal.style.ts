import styled from "styled-components";

export const LineModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 25px;
`;

export const HrLine = styled.div<{
  $imagePosition: string;
}>`
  width: 245px;
  height: 30px;
  background-image: url("https://t1.daumcdn.net/brunch/static/img/line/pc_line.png");
  background-repeat: no-repeat;
  background-position: ${({ $imagePosition }) => $imagePosition};
  cursor: pointer;
`;
