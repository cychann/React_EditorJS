import styled from "styled-components";

export const VideoIconWrapper = styled.div``;

export const VideoIcon = styled.div`
  width: 25px;
  height: 25px;
  background-position: 1px -83px;
  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/btn_side.v2.png");
  background-repeat: no-repeat;
  cursor: pointer;

  &:hover {
    background-position: -29px -83px;
  }
`;

export const VideoFileInput = styled.input`
  display: none;
`;
