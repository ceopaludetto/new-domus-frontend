import * as React from "react";

import { Blurred, Paper } from "@/client/components/layout";
import type { RouteComponentProps } from "@/client/utils/common.dto";

import { SidebarItem } from "../sidebar-item";
import s from "./index.scss";

export function Sidebar({ routes }: Pick<RouteComponentProps, "routes">) {
  return (
    <Paper outline noVerticalBorders noGutter square>
      <Blurred className={s.sidebar}>
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
      </Blurred>
    </Paper>
  );
}
