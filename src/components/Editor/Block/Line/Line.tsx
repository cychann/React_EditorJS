import * as S from "./Line.style";
import useEditorStore from "store/useEditorStore";

type lineData = {
  url: string;
  imagePosition: string;
};

interface Props {
  data: lineData;
  id: string;
  active: boolean;
}

export default function Line({ id, data, active }: Props) {
  const { align } = useEditorStore();

  return (
    <S.Hr
      $imageUrl={data.url}
      $imagePosition={data.imagePosition}
      $align={align}
      $active={active}
      tabIndex={0}
      role="button"
    />
  );
}
