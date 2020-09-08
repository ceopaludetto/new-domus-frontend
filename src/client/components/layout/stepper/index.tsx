import * as React from "react";

import clsx from "clsx";

import { Text } from "@/client/components/typography";
import { StepperContext } from "@/client/hooks";
import u from "@/client/styles/utils.module.scss";

import s from "./index.module.scss";

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
    if (onStepChange && currentPage !== previousPage && previousPage !== undefined) {
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
              <div className={s.icon}>
                <Icon size={20} />
              </div>
              <Text as="span" className={s.content}>
                {content}
              </Text>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
