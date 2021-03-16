import * as React from "react";
import { useCounter } from "react-use";

type Callback = (next: number) => Promise<any>;

interface UseStepperOptions {
  initial?: number;
  handleNextPageCallback?: Callback;
  handlePrevPageCallback?: Callback;
}

export function useStepper(pages: number, options?: UseStepperOptions) {
  const { handleNextPageCallback, handlePrevPageCallback } = options ?? {};

  const [current, { inc, dec }] = useCounter(options?.initial ? options.initial - 1 : 0, pages - 1, 0);

  const handleNextPage = React.useCallback(
    async (callback?: Callback) => {
      try {
        if (handleNextPageCallback) {
          await handleNextPageCallback(current + 1);
        }

        if (callback) {
          await callback(current + 1);
        }

        return inc();
      } catch (error) {
        return undefined;
      }
    },
    [inc, handleNextPageCallback, current]
  );

  const handlePrevPage = React.useCallback(
    async (callback?: Callback) => {
      try {
        if (handlePrevPageCallback) {
          await handlePrevPageCallback(current - 1);
        }

        if (callback) {
          await callback(current - 1);
        }

        return dec();
      } catch (error) {
        return undefined;
      }
    },
    [dec, handlePrevPageCallback, current]
  );

  const isLast = React.useMemo(() => current === pages - 1, [current, pages]);
  const isFirst = React.useMemo(() => current === 0, [current]);

  return { current, handleNextPage, handlePrevPage, isLast, isFirst };
}

type StepperContextProps = ReturnType<typeof useStepper>;

const StepperContext = React.createContext<StepperContextProps>(undefined as any);

export function StepperProvider({ children, ...rest }: StepperContextProps & { children: React.ReactNode }) {
  return <StepperContext.Provider value={rest}>{children}</StepperContext.Provider>;
}

export function useStepperContext() {
  return React.useContext(StepperContext);
}
