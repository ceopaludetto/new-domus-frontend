import { useCallback, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { useApolloClient } from "@apollo/client";
import { parse, stringify } from "qs";

import { SelectedCondominiumQuery, SelectedCondominiumDocument } from "@/client/graphql/index.graphql";

import { useCurrentCondominium } from "./use-current-condominium";

export function useChangeCondominium() {
  const client = useApolloClient();
  const currentCondominium = useCurrentCondominium();

  const location = useLocation();
  const history = useHistory();

  const change = useCallback(
    (id: string) => {
      client.cache.writeQuery<SelectedCondominiumQuery>({
        query: SelectedCondominiumDocument,
        data: {
          __typename: "Query",
          selectedCondominium: id,
        },
      });
    },
    [client]
  );

  useEffect(() => {
    const [, currentQuery] = location.search.split("?");

    const query = parse(currentQuery);

    if (currentCondominium) {
      if (query.condominium !== currentCondominium.id) {
        history.push({
          search: stringify({ ...query, condominium: currentCondominium.id }),
        });
      }
    } else {
      delete query.condominium;

      history.push({
        search: stringify(query),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, currentCondominium]);

  return change;
}
