import * as React from "react";
import { FiX } from "react-icons/fi";
import { VscArrowBoth } from "react-icons/vsc";
import { useHistory, useParams } from "react-router-dom";
import { useMeasure } from "react-use";

import { useQuery } from "@apollo/client";
import clsx from "clsx";

import { IconButton } from "@/client/components/form";
import { Blurred, Paper, MenuItem } from "@/client/components/layout";
import { Me, MeQuery, SelectedCondominium, SelectedCondominiumQuery } from "@/client/graphql";
import { usePathWithCondominium } from "@/client/hooks";
import u from "@/client/styles/utils.module.scss";
import type { RouteComponentProps } from "@/client/utils/common.dto";
import { isMultiCondominium } from "@/client/utils/condominium";

import { SidebarItem } from "../sidebar-item";
import s from "./index.module.scss";

export function Sidebar({ routes }: Pick<RouteComponentProps, "routes">) {
  const [listOpen, setListOpen] = React.useState(false);
  const [tooltip, setTooltip] = React.useState(false);
  const { data, client } = useQuery<MeQuery>(Me);
  const history = useHistory();
  const params = useParams();
  const multiCondominiums = React.useMemo(() => isMultiCondominium(data?.profile.person.condominiums), [data]);
  const [generatePath, condominium] = usePathWithCondominium();
  const [ref, { height }] = useMeasure<HTMLDivElement>();

  const changeSelectedCondominium = React.useCallback(
    (id: string) => {
      client.writeQuery<SelectedCondominiumQuery>({
        query: SelectedCondominium,
        data: {
          __typename: "Query",
          selectedCondominium: id,
        },
      });
    },
    [client]
  );

  const handleCondominiumChange = React.useCallback(
    (id: string) => {
      if (condominium?.id !== id) {
        changeSelectedCondominium(id);
      }
      setListOpen((v) => !v);
    },
    [condominium, setListOpen, changeSelectedCondominium]
  );

  React.useEffect(() => {
    if (condominium && (params as any).condominium !== condominium.id) {
      const path = generatePath("/app/:condominium");
      history.replace(path);
    }
  }, [condominium, generatePath, params, history]);

  return (
    <Paper className={clsx(s.container, u["w-100"], u["mw-300"])} outline noVerticalBorders noGutter square>
      <Blurred className={clsx(s.sidebar, u.flex)}>
        <div className={s.pages}>
          {routes
            ?.filter((r) => !r.meta?.hidden ?? true)
            ?.map((r) => {
              const Icon = r.meta?.icon;
              const path = Array.isArray(r.path) ? r.path[0] : r.path;

              return (
                <SidebarItem key={r.name} to={path} icon={<Icon size={18} />}>
                  {r.meta?.displayName}
                </SidebarItem>
              );
            })}
        </div>
        <div className={clsx(s.condominium, u.row, u["align-items-xs-center"])}>
          {multiCondominiums ? (
            <>
              <div className={clsx(u.col, u.xs)}>{listOpen ? "Selecione um condomínio" : condominium?.companyName}</div>
              <div className={u.col}>
                <IconButton
                  onClick={() => setListOpen((v) => !v)}
                  tooltip={{
                    content: tooltip ? "Fechar" : "Alterar Condomínio",
                    forceUpdate: tooltip,
                    updateOnContentChange: false,
                  }}
                  size="small"
                >
                  {listOpen ? <FiX /> : <VscArrowBoth />}
                </IconButton>
              </div>
            </>
          ) : (
            <div className={clsx(u.col, u.xs)}>{condominium?.companyName}</div>
          )}
        </div>
        {multiCondominiums && (
          <div
            style={{ maxHeight: listOpen ? height : 0 }}
            onTransitionEnd={() => setTooltip((v) => !v)}
            className={s["list-condominiums"]}
          >
            <div className={s.measure} ref={ref}>
              {data?.profile.person.condominiums.map((c) => (
                <MenuItem
                  onClick={() => handleCondominiumChange(c.id)}
                  className={clsx(s.item, c.id === condominium?.id && s.selected)}
                  key={c.id}
                  active={false}
                >
                  {c.companyName}
                </MenuItem>
              ))}
            </div>
          </div>
        )}
      </Blurred>
    </Paper>
  );
}
