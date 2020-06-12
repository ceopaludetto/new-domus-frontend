import * as React from "react";

import { Header } from "@/client/components";

export default function Main() {
  return (
    <>
      <Header />
      conteudo
      {Array.from(new Array(100).keys()).map((i) => (
        <br key={i} />
      ))}
    </>
  );
}
