import styled from "styled-components";
import { FaRegTrashCan } from "react-icons/fa6";
import { RiExpandHeightFill } from "react-icons/ri";

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const ExpandIcon = styled(RiExpandHeightFill)`
  cursor: pointer;
  z-index: 1;
`;

export const TrashIcon = styled(FaRegTrashCan)`
  cursor: pointer;
  z-index: 1;
`;
