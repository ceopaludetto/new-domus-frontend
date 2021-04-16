import { Helmet } from "react-helmet-async";

import { Switch, FormControl, FormLabel, FormControlLabel, Box } from "@material-ui/core";

import { MeDocument } from "@/client/graphql/index.graphql";
import { useColorMode } from "@/client/hooks";
import type { PreloadOptions } from "@/client/utils/types";

export default function Appearance() {
  const { colorMode, changeColorMode } = useColorMode();

  return (
    <>
      <Helmet title="Configurações - Aparência" />
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
              checked={colorMode === "light"}
              onChange={() => changeColorMode()}
            />
          }
          label="Ao alterar, a aplicação terá cores claras"
        />
      </FormControl>
    </>
  );
}

Appearance.fetchBefore = async ({ client }: PreloadOptions) => {
  await client.query({ query: MeDocument });
};
