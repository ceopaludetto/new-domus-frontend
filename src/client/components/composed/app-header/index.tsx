import * as React from "react";
import { FiSettings } from "react-icons/fi";

import clsx from "clsx";

import { IconButton } from "@/client/components/form";
import { Container, Breadcrumbs } from "@/client/components/layout";
import { PreloadLink } from "@/client/components/typography";
import { useBreadcrumbs } from "@/client/hooks";
import u from "@/client/styles/utils.scss";

export function AppHeader() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Container fluid>
      <div className={clsx(u.row, u["align-items-xs-center"], u["py-xs-4"])}>
        <div className={clsx(u.col, u.xs)}>
          <Breadcrumbs>
            {breadcrumbs.map((b, i) => (
              <Breadcrumbs.Item
                key={b.name}
                last={breadcrumbs.length - 1 === i}
                to={Array.isArray(b.path) ? b.path[0] : b.path}
              >
                {b.meta?.displayName}
              </Breadcrumbs.Item>
            ))}
          </Breadcrumbs>
        </div>
        <div className={u.col}>
          <PreloadLink
            as={IconButton}
            tooltip={{ content: "Configurações" }}
            to="/app/settings"
            size="small"
            color="text"
          >
            <FiSettings />
          </PreloadLink>
        </div>
      </div>
    </Container>
  );
}
