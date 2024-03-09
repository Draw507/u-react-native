import { useState } from "react";

export const useCounter = (initValue: number) => {
  const [count, setCount] = useState(initValue);

  const increaseBy = (value: number) => {
    setCount(count + value);
  };

  return {
    count,
    increaseBy,
  };
};
