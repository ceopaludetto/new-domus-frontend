import * as React from "react";

import clsx from "clsx";

import u from "@/client/styles/utils.scss";

interface StepperProps {
  items: {
    content: string;
    icon: React.ComponentType<any>;
  }[];
  currentPage: number;
  toggle: (page: number) => void;
}

export function Stepper({ items }: StepperProps) {
  return (
    <div className={clsx(u.row, u["align-items-xs-center"])}>
      {items.map(({ content, icon: Icon }, index) => (
        <React.Fragment key={content}>
          {index !== 0 && <div className={clsx(u.col, u.xs)} />}
          <div className={u.col}>
            <Icon />
            {content}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
