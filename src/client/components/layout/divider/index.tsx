import * as React from "react";

import clsx from "clsx";

import u from "@/client/styles/utils.scss";

import s from "./index.scss";

export function Divider() {
  return <hr className={clsx(s.divider, u["my-xs-3"])} />;
}
