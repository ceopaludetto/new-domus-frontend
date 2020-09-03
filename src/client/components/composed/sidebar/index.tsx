import * as React from "react";
import { VscArrowBoth } from "react-icons/vsc";

import clsx from "clsx";

import { IconButton } from "@/client/components/form";
import { Blurred, Paper } from "@/client/components/layout";
import u from "@/client/styles/utils.scss";
import type { RouteComponentProps } from "@/client/utils/common.dto";

import { SidebarItem } from "../sidebar-item";
import s from "./index.scss";

export function Sidebar({ routes }: Pick<RouteComponentProps, "routes">) {
  return (
    <Paper className={clsx(s.container, u["w-100"], u["mw-300"])} outline noVerticalBorders noGutter square>
      <Blurred className={clsx(s.sidebar, u.flex)}>
        <div className={s.pages}>
          {routes
            ?.filter((r) => !r.meta?.hidden ?? true)
            ?.map((r) => {
              const Icon = r.meta?.icon;

              return (
                <SidebarItem key={r.name} to={r.path} icon={<Icon size={18} />}>
                  {r.meta?.displayName}
                </SidebarItem>
              );
            })}
        </div>
        <div className={clsx(s.condominium, u.row, u["align-items-xs-center"])}>
          <div className={clsx(u.col, u.xs)}>Condominio X</div>
          <div className={u.col}>
            <IconButton size="small">
              <VscArrowBoth />
            </IconButton>
          </div>
        </div>
      </Blurred>
    </Paper>
  );
}
