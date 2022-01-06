import { FormProvider, useForm } from "react-hook-form";

import { Button, Grid, Paper, Typography } from "@mui/material";

import { TextField } from "@/client/components";
import { useVisibility } from "@/client/utils/hooks";

export default function ApplicationSettingsSecurity() {
  const [mapToProps] = useVisibility(["currentPassword", "newPassword", "repeatPassword"]);
  const form = useForm();

  return (
    <FormProvider {...form}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Senha atual"
                id="currentPassword"
                name="currentPassword"
                {...mapToProps("currentPassword")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Nova senha" id="newPassword" name="newPassword" {...mapToProps("newPassword")} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Repetir senha"
                id="repeatPassword"
                name="repeatPassword"
                {...mapToProps("repeatPassword")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography>Dicas de Senha</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <Button>Salvar Alterações</Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
