import { useState, useEffect } from "react";

/**
 * 일정 시간 후 자동으로 사라지는 알림을 관리하는 커스텀 훅
 * @param duration 알림이 표시되는 시간 (밀리초 단위, 기본값: 2000ms)
 * @returns {Object} 알림 상태와 표시 함수를 포함한 객체
 * - isVisible: 알림 표시 여부
 * - showNotification: 알림을 표시하는 함수
 */
export function useNotification(duration = 2000) {
  const [isVisible, setIsVisible] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  /**
   * 알림을 표시하고 자동으로 숨기는 함수
   * 1. 이전 타이머가 있다면 제거
   * 2. 알림을 표시
   * 3. 지정된 시간 후 알림을 숨김
   */
  const showNotification = () => {
    if (timerId) {
      clearTimeout(timerId);
    }

    setIsVisible(true);

    const newTimerId = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    setTimerId(newTimerId);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  return { isVisible, showNotification };
}
