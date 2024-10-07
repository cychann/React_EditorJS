import styled from "styled-components";

interface AlignIcon extends React.HTMLAttributes<HTMLDivElement> {
  hasCoverBg: boolean;
}

export const AlignLeftIcon = styled.div<AlignIcon>`
  width: 25px;
  height: 25px;
  background-image: url(//t1.daumcdn.net/brunch/static/img/help/pc/editor/btn_cover.png);
  background-repeat: no-repeat;
  background-position: ${({ hasCoverBg }) =>
    hasCoverBg ? "-29px -82px" : "1px -82px"};
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-position: -59px -82px;
  }
`;

export const AlignCenterIcon = styled.div<AlignIcon>`
  width: 25px;
  height: 25px;
  background-image: url(//t1.daumcdn.net/brunch/static/img/help/pc/editor/btn_cover.png);
  background-repeat: no-repeat;
  background-position: ${({ hasCoverBg }) =>
    hasCoverBg ? "-29px -124px" : "1px -124px"};
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-position: -59px -124px;
  }
`;
