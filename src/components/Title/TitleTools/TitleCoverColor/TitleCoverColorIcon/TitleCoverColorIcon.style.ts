import styled from "styled-components";

interface ImageColorIconProps extends React.HTMLAttributes<HTMLDivElement> {
  $hasCoverBg: boolean;
}

export const ImageColorIcon = styled.div<ImageColorIconProps>`
  width: 25px;
  height: 25px;
  background-image: url(//t1.daumcdn.net/brunch/static/img/help/pc/editor/btn_cover.png);
  background-repeat: no-repeat;
  background-position: ${({ $hasCoverBg }) =>
    $hasCoverBg ? "-29px -40px" : "1px -40px"};
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-position: -59px -40px;
  }
`;
