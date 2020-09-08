import * as React from "react";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";

import clsx from "clsx";

import { IconButton } from "@/client/components/form";
import { Paper, Container } from "@/client/components/layout";
import { Text, PreloadLink } from "@/client/components/typography";
import { routes } from "@/client/providers/routes";
import u from "@/client/styles/utils.module.scss";
import type { Route } from "@/client/utils/common.dto";

import s from "./index.module.scss";

export function Footer() {
  const main = React.useMemo(() => routes.find((r: Route) => r.name === "@MAIN"), []);
  const company = React.useMemo(() => main?.children?.filter((r: Route) => r.meta?.type === "company"), [main]);
  const resource = React.useMemo(() => main?.children?.filter((r: Route) => r.meta?.type === "resource"), [main]);
  const legal = React.useMemo(() => main?.children?.filter((r: Route) => r.meta?.type === "legal"), [main]);

  return (
    <footer className={s.footer}>
      <Paper outline noHorizontalBorders square size="large">
        <Container>
          <div className={u.row}>
            <div className={clsx(u.col, u["xs-12"], u.md)}>
              <Text gutter variant="subtitle-2">
                Recursos
              </Text>
              {resource?.map((r) => (
                <div key={r.name} className={u["mb-xs-3"]}>
                  <PreloadLink as={Text} to={r.path} className={s.link} link variant="body-2" color="muted">
                    {r.meta?.displayName}
                  </PreloadLink>
                </div>
              ))}
            </div>
            <div className={clsx(u.col, u["xs-12"], u.md)}>
              <Text gutter variant="subtitle-2">
                Companhia
              </Text>
              {company?.map((r) => (
                <div key={r.name} className={u["mb-xs-3"]}>
                  <PreloadLink as={Text} to={r.path} className={s.link} link variant="body-2" color="muted">
                    {r.meta?.displayName}
                  </PreloadLink>
                </div>
              ))}
            </div>
            <div className={clsx(u.col, u["xs-12"], u.md)}>
              <Text gutter variant="subtitle-2">
                Legal
              </Text>
              {legal?.map((r) => (
                <div key={r.name} className={u["mb-xs-3"]}>
                  <PreloadLink as={Text} to={r.path} className={s.link} link variant="body-2" color="muted">
                    {r.meta?.displayName}
                  </PreloadLink>
                </div>
              ))}
            </div>
          </div>
          <div
            className={clsx(u.row, u["mt-xs-10"], u["justify-content-xs-center"], u["justify-content-md-flex-start"])}
          >
            <div className={u.col}>
              <svg width="40" viewBox="0 0 116 100" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0z" />
              </svg>
            </div>
          </div>
          <div
            className={clsx(
              u.row,
              u["align-items-xs-center"],
              u["justify-content-xs-center"],
              u["justify-content-md-flex-start"]
            )}
          >
            <div className={clsx(u.col, u["xs-12"], u["text-align-xs-center"], u.md, u["text-align-md-left"])}>
              <Text color="muted" variant="body-2">
                Copyright © 2020 Domus Inc. Todos direitos reservados.
              </Text>
            </div>
            <div className={u.col}>
              <IconButton size="small">
                <AiOutlineGithub />
              </IconButton>{" "}
              <IconButton size="small">
                <AiOutlineTwitter />
              </IconButton>
            </div>
          </div>
        </Container>
      </Paper>
    </footer>
  );
}
