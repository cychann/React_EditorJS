import styled from "styled-components";

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const ExpandIcon = styled.div<{
  $expanded?: boolean | null;
}>`
  width: 25px;
  height: 25px;
  background-image: url(//t1.daumcdn.net/brunch/static/img/help/pc/editor/btn_cover.png);
  background-repeat: no-repeat;
  background-position: ${({ $expanded }) =>
    $expanded ? "-29px -166px" : "-29px -208px"};
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-position: ${({ $expanded }) =>
      $expanded ? "-59px -166px" : "-59px -208px"};
  }
`;

export const TrashIcon = styled.div`
  width: 25px;
  height: 25px;
  background-image: url(//t1.daumcdn.net/brunch/static/img/help/pc/editor/btn_cover.png);
  background-repeat: no-repeat;
  background-position: -29px -250px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-position: -59px -250px;
  }
`;
