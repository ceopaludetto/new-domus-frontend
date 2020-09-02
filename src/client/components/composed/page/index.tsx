import * as React from "react";

import { Container } from "@/client/components/layout";
import { Text } from "@/client/components/typography";
import u from "@/client/styles/utils.scss";

interface PageProps extends React.ComponentProps<typeof Container> {
  title: string;
  subtitle: string;
}

export function Page({ title, subtitle, fluid = false, children, ...rest }: PageProps) {
  return (
    <Container className={u["pt-xs-6"]} fluid={fluid} {...rest}>
      <Text variant="subtitle-1" noMargin color="primary">
        {subtitle}
      </Text>
      <Text variant="headline-4" as="h1" gutter color="text">
        {title}
      </Text>
      {children}
    </Container>
  );
}
