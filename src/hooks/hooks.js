import { useEffect, useState } from "react";

export function useTimer(timeInSeconds) {
  const totalTime = timeInSeconds * 1000;
  const [showNotification, setShowNotification] = useState(true);
  const [currentValue, setCurrentValue] = useState(totalTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue((prevState) => {
        if (prevState <= 0) {
          setShowNotification(false);
        }
        return prevState - 50;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return { showNotification, totalTime, currentValue };
}
