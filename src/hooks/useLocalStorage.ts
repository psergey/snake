import { useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  state: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);
    if (!data) return state;
    if (typeof state === "object") return <T>JSON.parse(data);
    return <T>data;
  });

  useEffect(() => {
    const data = typeof state === "object" ? JSON.stringify(value) : "" + value;
    localStorage.setItem(key, data);
  }, [key, state, value]);

  return [value, setValue];
};

export default useLocalStorage;
