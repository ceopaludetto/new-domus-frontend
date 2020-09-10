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

export function useStepper(pages: number, onStepChange?: (index: number) => any): UseStepperReturn {
  const [currentPage, setCurrentPage] = React.useState(0);
  const previousPage = usePrevious(currentPage);

  const changePage = React.useCallback(
    async (index: number) => {
      setCurrentPage(index);
      if (onStepChange) {
        await onStepChange(index);
      }
    },
    [onStepChange, setCurrentPage]
  );

  const next = React.useCallback(() => {
    if (currentPage + 1 <= pages) {
      changePage(currentPage + 1);
    }
  }, [changePage, pages, currentPage]);

  const prev = React.useCallback(() => {
    if (currentPage - 1 >= 0) {
      changePage(currentPage - 1);
    }
  }, [changePage, currentPage]);

  const toggle = React.useCallback(
    (page: number) => {
      if (page <= pages && page >= 0) {
        changePage(page);
      }
    },
    [changePage, pages]
  );

  return [currentPage, { next, prev, toggle, previousPage }];
}
