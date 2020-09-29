import * as React from "react";
import { Helmet } from "react-helmet-async";

import { Switch, FormControl, FormLabel, FormControlLabel, Box } from "@material-ui/core";

import { useMeQuery, useToggleThemeMutation, MeDocument, Theme } from "@/client/graphql";
import type { Client } from "@/client/utils/common.dto";

export default function Appearance() {
  const { data } = useMeQuery();
  const [toggle] = useToggleThemeMutation();

  return (
    <>
      <Helmet title="Aparência" />
      <FormControl>
        <Box mb={0.5}>
          <FormLabel>Tema claro</FormLabel>
        </Box>
        <FormControlLabel
          control={
            <Switch
              name="toggle-theme"
              id="toggle-theme"
              color="primary"
              checked={data?.profile.settings.theme === "LIGHT"}
              onChange={() =>
                toggle({
                  optimisticResponse: {
                    __typename: "Mutation",
                    toggleTheme: {
                      __typename: "Settings",
                      id: data?.profile.settings.id ?? "",
                      theme: (data?.profile?.settings?.theme ?? Theme.Dark) === Theme.Dark ? Theme.Light : Theme.Dark,
                    },
                  },
                })
              }
            />
          }
          label="Ao alterar, a aplicação terá cores claras"
        />
      </FormControl>
    </>
  );
}

Appearance.fetchBefore = async (client: Client) => {
  await client.query({ query: MeDocument });
};
