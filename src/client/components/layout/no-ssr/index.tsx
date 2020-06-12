import * as React from "react";
import { useIsomorphicLayoutEffect } from "react-use";

interface NoSsrProps {
  children: React.ReactNode;
  defer?: boolean;
  fallback?: React.ReactNode;
}

export function NoSsr({ children, defer = false, fallback = null }: NoSsrProps) {
  const [mountedState, setMountedState] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);

  React.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);

  return <>{mountedState ? children : fallback}</>;
}
