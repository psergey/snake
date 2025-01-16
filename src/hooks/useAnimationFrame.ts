import { useCallback, useEffect, useRef } from "react";

export const useAnimationFrame = ({
  nextAnimationFrameHandler,
  framePerSeconds,
}: {
  nextAnimationFrameHandler: () => void;
  framePerSeconds: number;
}) => {
  const frameId = useRef(0);
  const previousTime = useRef<number | undefined>();

  const animate = useCallback(
    (time: number) => {
      if (!previousTime.current) previousTime.current = time;

      const tick = (time - previousTime.current) / 1000;
      if (tick > framePerSeconds) {
        nextAnimationFrameHandler();
        previousTime.current = time;
      }

      frameId.current = requestAnimationFrame(animate);
    },
    [nextAnimationFrameHandler, framePerSeconds]
  );

  useEffect(() => {
    frameId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId.current);
    };
  }, [nextAnimationFrameHandler, animate]);
};
