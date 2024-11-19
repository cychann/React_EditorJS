import { useEffect, useRef } from "react";

/**
 * 특정 요소의 외부 클릭을 감지하는 커스텀 훅
 * @param onClickOutside 외부 클릭 시 실행할 콜백 함수
 * @param ignoreCondition 특정 조건에서 외부 클릭을 무시할지 결정하는 선택적 함수
 * @returns ref 객체 - 감지하고자 하는 요소에 연결해야 함
 */
export const useClickOutside = <T extends HTMLElement>(
  onClickOutside: () => void,
  ignoreCondition?: (element: HTMLElement) => boolean
) => {
  const $ref = useRef<T | null>(null);

  useEffect(() => {
    /**
     * 클릭 이벤트 핸들러
     * 1. ref가 연결된 요소 외부 클릭 확인
     * 2. ignoreCondition 조건 확인
     * 3. 조건 만족 시 onClickOutside 콜백 실행
     */
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        $ref.current &&
        !$ref.current.contains(target) && // ref 요소의 외부 클릭 확인
        !(ignoreCondition && ignoreCondition(target)) // 무시 조건 확인
      ) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside, ignoreCondition]);

  return { $ref };
};
