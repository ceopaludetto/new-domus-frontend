import * as React from "react";
import { FiSettings } from "react-icons/fi";

import clsx from "clsx";

import { IconButton } from "@/client/components/form";
import { PreloadLink } from "@/client/components/typography";
import u from "@/client/styles/utils.scss";

export function AppHeader() {
  return (
    <div className={clsx(u.row, u["align-items-xs-center"], u["p-xs-4"])}>
      <div className={clsx(u.col, u.xs)}>breadcrumb</div>
      <div className={u.col}>
        <PreloadLink as={IconButton} to="/app/settings" size="small" color="text">
          <FiSettings />
        </PreloadLink>
      </div>
    </div>
  );
}
