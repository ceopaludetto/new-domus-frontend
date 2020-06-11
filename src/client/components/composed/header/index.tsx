import * as React from "react";

import { Blurred, Container } from "../../layout";
import s from "./index.scss";

export function Header() {
  return (
    <header className={s.header}>
      <Blurred border>
        <Container>
          <div className={s.content}>teste</div>
        </Container>
      </Blurred>
    </header>
  );
}
