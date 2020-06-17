import * as React from "react";

import clsx from "clsx";

import { StepperContext } from "@/client/hooks";
import u from "@/client/styles/utils.scss";

import s from "./index.scss";

interface StepperProps {
  items: {
    content: string;
    icon: React.ComponentType<any>;
  }[];
  clickable?: boolean;
  onStepChange?: (current: number) => void;
}

export function Stepper({ items, clickable = true, onStepChange }: StepperProps) {
  const { currentPage, previousPage, toggle } = React.useContext(StepperContext);

  React.useEffect(() => {
    if (onStepChange && currentPage !== previousPage) {
      onStepChange(currentPage);
    }
  }, [currentPage, previousPage, onStepChange]);

  function handleClick(index: number) {
    return () => {
      toggle(index);
    };
  }

  function handleKeyDown(index: number) {
    return (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        toggle(index);
      }
    };
  }

  return (
    <div className={clsx(u.row, u["align-items-xs-center"], s.stepper)}>
      {items.map(({ content, icon: Icon }, index) => (
        <React.Fragment key={content}>
          {index !== 0 && <div className={clsx(u.col, u.xs, s.line, currentPage >= index && s.active)} />}
          <div className={u.col}>
            <div
              role="button"
              tabIndex={clickable ? 0 : undefined}
              className={clsx(s.item, currentPage >= index && s.active, clickable && s.clickable)}
              onClick={clickable ? handleClick(index) : undefined}
              onKeyDown={clickable ? handleKeyDown(index) : undefined}
            >
              <div className={clsx(u["pr-4"], s.icon)}>
                <Icon />
              </div>
              <span className={s.content}>{content}</span>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
