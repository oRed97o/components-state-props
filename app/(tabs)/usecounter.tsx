import { useRef, useState } from "react";

export type UseCounterReturn = {
  count: number;
  handleReset: () => void;
  startAdd: () => void;
  startMinus: () => void;
  stopHold: () => void;
};

const HOLD_DELAY = 350;
const HOLD_INTERVAL = 80;

//HOOK
export function useCounter(initialValue: number = 100): UseCounterReturn {

  const [count, setCount] = useState<number>(initialValue);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startHold = (step: number) => {
    clearTimers();
    
    setCount((prev) => prev + step);

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCount((prev) => prev + step);
      }, HOLD_INTERVAL);
    }, HOLD_DELAY);
  };

  const startAdd = () => startHold(1);
  const startMinus = () => startHold(-1);
  const stopHold = () => clearTimers();

  const handleReset = () => {
    clearTimers();
    setCount(initialValue);
  };

  return { count, handleReset, startAdd, startMinus, stopHold };
}