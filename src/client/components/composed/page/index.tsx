import * as React from "react";
import { HelmetProps, Helmet } from "react-helmet-async";

import clsx from "clsx";

import { Container } from "@/client/components/layout";
import { Text } from "@/client/components/typography";
import u from "@/client/styles/utils.module.scss";

interface PageProps extends React.ComponentProps<typeof Container> {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  helmet?: HelmetProps;
}

export function Page({ title, subtitle, fluid = false, children, actions, helmet, ...rest }: PageProps) {
  return (
    <Container className={u["py-xs-8"]} fluid={fluid} {...rest}>
      {helmet && <Helmet {...helmet} />}
      <div className={clsx(u.row, u["mb-xs-8"], u["align-items-xs-center"])}>
        <div className={clsx(u.col, u.xs)}>
          <Text variant="subtitle-1" noMargin color="primary">
            {subtitle}
          </Text>
          <Text variant="headline-4" as="h1" noMargin color="text">
            {title}
          </Text>
        </div>
        {actions && <div className={u.col}>{actions}</div>}
      </div>
      {children}
    </Container>
  );
}
