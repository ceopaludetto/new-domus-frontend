import * as React from "react";

import clsx from "clsx";

import { Text } from "@/client/components/typography";
import u from "@/client/styles/utils.scss";

import s from "./index.scss";

function isFieldset(props: any): props is React.HTMLAttributes<HTMLFieldSetElement> & { content: string } {
  return "content" in props;
}

type DividerProps =
  | React.HTMLAttributes<HTMLHRElement>
  | (React.HTMLAttributes<HTMLFieldSetElement> & { content: string });

export function Divider(props: DividerProps) {
  if (isFieldset(props)) {
    const { content, className, ...rest } = props;

    return (
      <fieldset className={clsx(s.divider, u["my-xs-5"], u["py-xs-0"], u["mx-xs-0"], className)} {...rest}>
        <legend className={u["px-xs-3"]}>
          <Text as="span" variant="subtitle-1">
            {content}
          </Text>
        </legend>
      </fieldset>
    );
  }

  const { className, ...rest } = props;
  return <hr className={clsx(s.divider, u["my-xs-5"], className)} {...rest} />;
}
