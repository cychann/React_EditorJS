import styled from "styled-components";
import { PiImageThin } from "react-icons/pi";

export const ImageInputWrapper = styled.div`
  z-index: 1;
`;

export const ImageFileInput = styled.input`
  display: none;
`;

export const ImageInputIcon = styled(PiImageThin)`
  cursor: pointer;
  z-index: 1;
`;
