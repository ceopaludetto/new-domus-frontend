import * as React from "react";
import { usePrevious } from "react-use";

interface StepperContextProps {
  currentPage: number;
  previousPage?: number;
  toggle: (page: number) => void;
  next: () => void;
  prev: () => void;
}

type UseStepperReturn = [StepperContextProps["currentPage"], Omit<StepperContextProps, "currentPage">];

export const StepperContext = React.createContext<StepperContextProps>(undefined as any);

export function useStepper(pages: number): UseStepperReturn {
  const [currentPage, setCurrentPage] = React.useState(0);
  const previousPage = usePrevious(currentPage);

  const next = React.useCallback(() => {
    if (currentPage + 1 <= pages) {
      setCurrentPage(currentPage + 1);
    }
  }, [setCurrentPage, pages, currentPage]);

  const prev = React.useCallback(() => {
    if (currentPage - 1 >= 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [setCurrentPage, currentPage]);

  const toggle = React.useCallback(
    (page: number) => {
      if (page <= pages && page >= 0) {
        setCurrentPage(page);
      }
    },
    [setCurrentPage, pages]
  );

  return [currentPage, { next, prev, toggle, previousPage }];
}
