import * as React from "react";
import { FiX } from "react-icons/fi";
import { VscArrowBoth } from "react-icons/vsc";

import { useQuery } from "@apollo/client";
import clsx from "clsx";

import { IconButton } from "@/client/components/form";
import { Blurred, Paper, MenuItem } from "@/client/components/layout";
import { Me, MeQuery } from "@/client/graphql";
import u from "@/client/styles/utils.scss";
import type { RouteComponentProps } from "@/client/utils/common.dto";

import { SidebarItem } from "../sidebar-item";
import s from "./index.scss";

export function Sidebar({ routes }: Pick<RouteComponentProps, "routes">) {
  const [listOpen, setListOpen] = React.useState(false);
  const [tooltip, setTooltip] = React.useState(false);
  const { data } = useQuery<MeQuery>(Me);
  const multiCondominiums = React.useMemo(() => (data?.profile.person.condominiums.length ?? 1) > 1, [data]);

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
          {multiCondominiums ? (
            <>
              <div className={clsx(u.col, u.xs)}>
                {listOpen ? "Selecione um condomínio" : data?.profile.person.condominiums[0].companyName}
              </div>
              <div className={u.col}>
                <IconButton
                  onClick={() => setListOpen((v) => !v)}
                  tooltip={{ content: tooltip ? "Fechar" : "Alterar Condomínio", forceUpdate: tooltip }}
                  size="small"
                >
                  {listOpen ? <FiX /> : <VscArrowBoth />}
                </IconButton>
              </div>
            </>
          ) : (
            <div className={clsx(u.col, u.xs)}>{data?.profile.person.condominiums[0].companyName}</div>
          )}
        </div>
        {multiCondominiums && (
          <div
            onTransitionEnd={() => setTooltip((v) => !v)}
            className={clsx(s["list-condominiums"], listOpen && s.open)}
          >
            {data?.profile.person.condominiums.map((c) => (
              <MenuItem className={s.item} key={c.id} active={false}>
                {c.companyName}
              </MenuItem>
            ))}
          </div>
        )}
      </Blurred>
    </Paper>
  );
}
