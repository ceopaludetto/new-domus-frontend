import { useMemo, useRef, useState } from "react";
import { useIsomorphicLayoutEffect, usePrevious, useWindowScroll } from "react-use";

interface UseAnimatedHeaderProps {
  hasTabs?: boolean;
}

export function useAnimatedHeader<T extends HTMLElement = HTMLDivElement>({ hasTabs }: UseAnimatedHeaderProps) {
  const { y } = useWindowScroll();
  const prevY = usePrevious(y);
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  const shouldShow = useMemo(() => {
    if (y === 0 || !hasTabs) return true;
    return y <= (prevY ?? y + 1);
  }, [y, prevY, hasTabs]);

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const rect = ref.current?.getBoundingClientRect();

      setHeight(rect?.height ?? 0);
    }
  }, []);

  return [ref, { shouldShow, height, y }] as const;
}
