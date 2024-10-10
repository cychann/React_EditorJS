import React, { forwardRef } from "react";
import * as S from "./InlineTooltip.style";

const Tooltip = forwardRef<
  HTMLDivElement,
  {
    visible: boolean;
    children: React.ReactNode;
    position: { left: number; top: number };
  }
>(({ visible, children, position = { left: 0, top: 50 } }, ref) => {
  return (
    <S.TooltipWrapper
      ref={ref}
      $visible={visible}
      $left={position.left}
      $top={position.top}
    >
      {children}
    </S.TooltipWrapper>
  );
});

export default Tooltip;
