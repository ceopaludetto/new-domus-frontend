import * as React from "react";

import clsx from "clsx";

import u from "@/client/styles/utils.scss";

import { Button } from "../../form";
import { Blurred, Container } from "../../layout";
import { PreloadLink } from "../../typography/preload-link";
import s from "./index.scss";

export function Header() {
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
              <PreloadLink as={Button} variant="flat" size="small" to="/auth/signin">
                Entrar
              </PreloadLink>{" "}
              <PreloadLink as={Button} variant="contained" size="small" to="/auth/signup/step-1">
                Cadastre-se
              </PreloadLink>
            </div>
          </div>
        </Container>
      </Blurred>
    </header>
  );
}
