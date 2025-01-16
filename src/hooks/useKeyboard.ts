import { useCallback, useEffect, useRef } from "react";

export const useKeyboard = (
  callback: (event: KeyboardEvent) => void,
  node?: HTMLElement
) => {
  const callbackRef = useRef(callback);
  const keydownHandler = useCallback((event: Event) => {
    const keyPressed = event as KeyboardEvent;
    callbackRef.current(keyPressed);
  }, []);

  callbackRef.current = callback;

  useEffect(() => {
    const targetNode = node ?? document;
    targetNode?.addEventListener("keydown", keydownHandler);
    return () => {
      console.log("useKeyboard: UNSUBSCRIBE");
      targetNode?.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler, node]);
};
