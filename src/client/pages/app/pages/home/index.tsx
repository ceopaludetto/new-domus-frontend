import * as React from "react";

import { Page } from "@/client/components";

export default function Home() {
  return (
    <Page title="Início" subtitle="Geral" helmet={{ title: "Início" }} fluid>
      teste
    </Page>
  );
}