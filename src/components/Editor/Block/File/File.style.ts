import styled from "styled-components";
import { COMMON_THEME } from "styles/Theme";

const alignItemsMap: Record<string, string> = {
  left: "flex-start",
  center: "center",
};

export const FileWrapper = styled.div<{
  $align: "left" | "center";
}>`
  width: 100%;
  display: flex;
  justify-content: ${({ $align }) => alignItemsMap[$align]};
`;

export const FileContainer = styled.div`
  border: 1px solid ${COMMON_THEME.gray_primary};
  border-radius: 18px;
  width: 290px;
  height: 36px;
  padding: 8px 16px;
  font-size: 13px;
  color: ${COMMON_THEME.black_primary};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const FileWrapperIcon = styled.div`
  width: 14px;
  height: 14px;
  background: url("https://t1.daumcdn.net/brunch/static/img/help/pc/bg_editor_attach_1.png")
    no-repeat;
`;

export const FileName = styled.p`
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
