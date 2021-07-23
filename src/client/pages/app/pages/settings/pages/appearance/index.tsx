import { Grid, FormControl, FormLabel } from "@material-ui/core";

import { ThemeSelector } from "@/client/components";

export default function AppSettingsAppearance() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl>
          <FormLabel>Tema</FormLabel>
          <ThemeSelector />
        </FormControl>
      </Grid>
    </Grid>
  );
}
