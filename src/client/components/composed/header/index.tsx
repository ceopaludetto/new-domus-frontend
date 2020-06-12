import * as React from "react";

import { Blurred, Container } from "../../layout";
import s from "./index.scss";

export function Header() {
  return (
    <header className={s.header}>
      <Blurred border>
        <Container>
          <div className={s.content}>
            <svg width="40" viewBox="0 0 116 100" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0z" />
            </svg>
          </div>
        </Container>
      </Blurred>
    </header>
  );
}
