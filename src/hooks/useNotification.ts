import { useState, useEffect } from "react";

export function useNotification(duration = 2000) {
  const [isVisible, setIsVisible] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  return { isVisible, showNotification };
}
