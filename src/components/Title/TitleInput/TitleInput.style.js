import styled from "styled-components";
import { commonTheme } from "styles/Theme";

export const TitleInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100%;
`;

export const TitleInput = styled.div`
width: 100%;
  font-size: 45px;
  color: ${commonTheme.black_primary};

  &::placeholder {
  color: ${commonTheme.gray_primary};
`;

export const SubTitleInput = styled.div`
width: 100%;

  font-size: 16px;
  color: ${commonTheme.black_primary};

  &::placeholder {
  color: ${commonTheme.gray_primary};
`;
