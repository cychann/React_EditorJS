import TitleTextInput from "@/components/Title/TitleInput/TitleTextInput/TitleTextInput";
import SubtitleTextInput from "@/components/Title/TitleInput/SubtitleTextInput/SubtitleTextInput";
import TitleInputContainer from "@/components/Title/TitleInput/TitleInputWrapper/TitleInputContainer/TitleInputContainer";

/**
 * 제목과 부제목 입력 필드를 감싸는 컨테이너 컴포넌트
 * 배경 유무와 정렬 상태에 따라 스타일이 변경됨
 */
export default function TitleInputWrapper() {
  return (
    <TitleInputContainer>
      <TitleTextInput />
      <SubtitleTextInput />
    </TitleInputContainer>
  );
}
