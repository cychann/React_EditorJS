import { ReactNode } from "react";
import * as S from "./TitleInputContainer.style";
import useTitleStore from "@/store/useTitleStore";

function TitleInputContainer({ children }: { children: ReactNode }) {
  const hasTitleBackground = useTitleStore((state) => state.hasTitleBackground);

  const titleAlign = useTitleStore((state) => state.alignment);

  return (
    <S.TitleInputWrapper
      $align={titleAlign}
      $hasBackground={hasTitleBackground}
    >
      {children}
    </S.TitleInputWrapper>
  );
}

export default TitleInputContainer;
