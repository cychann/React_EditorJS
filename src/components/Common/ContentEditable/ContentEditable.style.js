import styled from "styled-components";

export const EditableDiv = styled.div`
  border: 1px solid #ccc; /* 입력 영역의 테두리 */
  padding: 10px; /* 패딩 추가 */
  min-height: 40px; /* 최소 높이 설정 */
  color: black; /* 입력된 텍스트 색상 */

  /* placeholder 스타일 */
  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  }

  /* 입력된 텍스트가 있을 때 색상 조정 */
  &[contenteditable="true"]:not(:empty) {
    color: black; /* 입력된 텍스트 색상 */
  }
`;
