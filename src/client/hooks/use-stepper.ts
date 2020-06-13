import * as React from "react";
import { usePrevious } from "react-use";

type UseStepperReturn = [
  number,
  {
    toggle: (page: number) => void;
    next: () => void;
    prev: () => void;
    previousPage: number;
  }
];

export function useStepper(pages: number): UseStepperReturn {
  const [currentPage, setCurrentPage] = React.useState(0);
  const previousPage = usePrevious(currentPage);

  const next = React.useCallback(() => {
    setCurrentPage((curr) => {
      if (curr + 1 <= pages) {
        return curr + 1;
      }
      return curr;
    });
  }, [setCurrentPage, pages]);

  const prev = React.useCallback(() => {
    setCurrentPage((curr) => {
      if (curr - 1 > 0) {
        return curr - 1;
      }
      return curr;
    });
  }, [setCurrentPage]);

  const toggle = React.useCallback(
    (page: number) => {
      if (page <= pages || page > 0) {
        setCurrentPage(page);
      }
    },
    [setCurrentPage, pages]
  );

  return [currentPage, { next, prev, toggle, previousPage }];
}
