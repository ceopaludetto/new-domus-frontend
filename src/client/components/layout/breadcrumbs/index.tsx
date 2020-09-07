import * as React from "react";
import { FiChevronRight } from "react-icons/fi";

import clsx from "clsx";

import { PreloadLink, Text } from "@/client/components/typography";
import u from "@/client/styles/utils.scss";

import s from "./index.scss";

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNodeArray;
  separator?: React.ReactNode;
}

export function Breadcrumbs({ children, separator = <FiChevronRight size={18} />, ...rest }: BreadcrumbsProps) {
  const len = React.Children.count(children);

  return (
    <div className={clsx(u.row, u["align-items-xs-center"], u["no-gap"], s.container)} {...rest}>
      {React.Children.map(children, (item, index) => (
        <>
          <div className={u.col}>{item}</div>
          {len - 1 !== index && <div className={clsx(u.col, s.separator, u.flex)}>{separator}</div>}
        </>
      ))}
    </div>
  );
}

type BreadcrumbsItemProps = React.ComponentProps<typeof PreloadLink> & { last: boolean };

Breadcrumbs.Item = ({ children, to, last, ...rest }: BreadcrumbsItemProps) => {
  return (
    <>
      {last ? (
        <Text variant="body-1" as="span" color="text">
          {children}
        </Text>
      ) : (
        <PreloadLink to={to} className={s.item} {...rest}>
          <Text as="span" noMargin variant="body-1">
            {children}
          </Text>
        </PreloadLink>
      )}
    </>
  );
};
