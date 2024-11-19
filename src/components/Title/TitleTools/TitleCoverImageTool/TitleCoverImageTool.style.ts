import styled from "styled-components";

export const ImageInputWrapper = styled.div`
  z-index: 1;
`;

export const ImageFileInput = styled.input`
  display: none;
`;

export const ImageInputIcon = styled.div<{
  $hasCoverBg: boolean;
}>`
  width: 25px;
  height: 25px;
  background-image: url(//t1.daumcdn.net/brunch/static/img/help/pc/editor/btn_cover.png);
  background-repeat: no-repeat;
  background-position: ${({ $hasCoverBg }) =>
    $hasCoverBg ? "-29px 2px" : "1px 2px"};
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-position: -59px 2px;
  }
`;
