import * as React from "react";

import { PreloadLink, Header } from "@/client/components";

export default function Main() {
  return (
    <>
      <Header />
      <PreloadLink to="/b">b</PreloadLink>
    </>
  );
}
