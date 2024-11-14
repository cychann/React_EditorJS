import styled from "styled-components";

export const AlignIcon = styled.div<{
  $align: "left" | "center";
}>`
  width: 25px;
  height: 25px;
  background-position: ${({ $align }) =>
    $align === "left" ? "1px -292px" : "1px -334px"};
  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/btn_side.v2.png");
  background-repeat: no-repeat;
  cursor: pointer;

  &:hover {
    background-position: ${({ $align }) =>
      $align === "left" ? "-29px -292px" : "-29px -334px"};
  }
`;
