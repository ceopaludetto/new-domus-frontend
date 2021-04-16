import { useCallback, useMemo, useContext, createContext } from "react";
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

  const handleNextPage = useCallback(
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

  const handlePrevPage = useCallback(
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

  const isLast = useMemo(() => current === pages - 1, [current, pages]);
  const isFirst = useMemo(() => current === 0, [current]);

  return { current, handleNextPage, handlePrevPage, isLast, isFirst };
}

type StepperContextProps = ReturnType<typeof useStepper>;

const StepperContext = createContext<StepperContextProps>(undefined as any);

export function StepperProvider({ children, ...rest }: StepperContextProps & { children: ReactNode }) {
  return <StepperContext.Provider value={rest}>{children}</StepperContext.Provider>;
}

export function useStepperContext() {
  return useContext(StepperContext);
}
