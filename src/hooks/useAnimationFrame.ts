import { useEffect, useRef } from "react";

export const useAnimationFrame = ({
  nextAnimationFrameHandler,
  isActive,
}: {
  nextAnimationFrameHandler: (elapsed: number) => void;
  isActive: boolean;
}) => {
  const frameId = useRef(0);
  const previousTime = useRef<number | undefined>();

  useEffect(() => {
    const animate = (time: number) => {
      if (!previousTime.current) previousTime.current = time;
      const tick = time - previousTime.current;

      nextAnimationFrameHandler(tick);
      frameId.current = requestAnimationFrame(animate);
    };

    previousTime.current = undefined;

    if (isActive) {
      frameId.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frameId.current);
    }

    return () => {
      cancelAnimationFrame(frameId.current);
    };
  }, [isActive, nextAnimationFrameHandler]);
};
