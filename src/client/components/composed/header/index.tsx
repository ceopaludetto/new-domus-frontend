import * as React from "react";

import { useQuery } from "@apollo/client";
import clsx from "clsx";

import { Logged, LoggedQuery } from "@/client/graphql";
import u from "@/client/styles/utils.module.scss";

import { Button } from "../../form";
import { Blurred, Container } from "../../layout";
import { PreloadLink } from "../../typography/preload-link";
import s from "./index.module.scss";

export function Header() {
  const { data } = useQuery<LoggedQuery>(Logged);

  return (
    <header className={s.header}>
      <Blurred className={u["px-xs-10"]} border>
        <Container>
          <div className={clsx(s.content, u.row, u["align-items-xs-center"])}>
            <div className={clsx(u.col, u.xs)}>
              <svg width="40" viewBox="0 0 116 100" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0z" />
              </svg>
            </div>
            <div>
              {data?.logged ? (
                <PreloadLink as={Button} variant="flat" size="small" to="/app/:condominium">
                  Abrir
                </PreloadLink>
              ) : (
                <>
                  <PreloadLink as={Button} variant="flat" size="small" to="/auth/signin">
                    Entrar
                  </PreloadLink>{" "}
                  <PreloadLink as={Button} variant="contained" size="small" to="/auth/signup/step-1">
                    Cadastre-se
                  </PreloadLink>
                </>
              )}
            </div>
          </div>
        </Container>
      </Blurred>
    </header>
  );
}
