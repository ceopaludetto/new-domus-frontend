import * as React from "react";
import { usePrevious } from "react-use";

interface StepperContextProps {
  currentPage: number;
  previousPage?: number;
  toggle: (page: number) => void;
  next: () => void;
  prev: () => void;
  setChangeCriteria: (page: number, trigger: () => Promise<boolean>) => void;
}

type UseStepperReturn = [
  number,
  {
    toggle: (page: number) => void;
    next: () => void;
    prev: () => void;
    setChangeCriteria: (page: number, trigger: () => Promise<boolean>) => void;
    previousPage?: number;
  }
];

export const StepperContext = React.createContext<StepperContextProps>({
  currentPage: 0,
  previousPage: 0,
  toggle: () => {},
  next: () => {},
  prev: () => {},
  setChangeCriteria: () => {},
});

export function useStepper(pages: number): UseStepperReturn {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [changeCriterias, setChangeCriterias] = React.useState(() => {
    const changes: (() => Promise<boolean>)[] = [];
    for (let i = 0; i < pages; i += 1) {
      changes.push(async () => true);
    }
    return changes;
  });
  const previousPage = usePrevious(currentPage);

  const next = React.useCallback(async () => {
    if (currentPage + 1 <= pages && (await changeCriterias[currentPage]())) {
      setCurrentPage(currentPage + 1);
    }
  }, [setCurrentPage, pages, changeCriterias, currentPage]);

  const prev = React.useCallback(() => {
    if (currentPage - 1 >= 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [setCurrentPage, currentPage]);

  const toggle = React.useCallback(
    async (page: number) => {
      if ((page <= pages || page > 0) && (await changeCriterias[currentPage]())) {
        setCurrentPage(page);
      }
    },
    [setCurrentPage, changeCriterias, currentPage, pages]
  );

  const setChangeCriteria = React.useCallback(
    (index: number, criteria: () => Promise<boolean>) => {
      const newChangeCriterias = changeCriterias;
      newChangeCriterias[index] = criteria;
      setChangeCriterias(newChangeCriterias);
    },
    [changeCriterias]
  );

  return [currentPage, { next, prev, toggle, previousPage, setChangeCriteria }];
}
