import { FormProvider, useForm } from "react-hook-form";

import { Button, Grid, Divider, Typography } from "@mui/material";

import { TextField } from "@/client/components";

export default function ApplicationSettingsPersonal() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Informações Pessoais</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField label="E-mail" name="email" id="email" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Nome" name="name" id="name" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Sobrenome" name="lastName" id="lastName" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Data de Nascimento" name="birthDate" id="birthDate" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Telefone" name="phone" id="phone" />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button type="submit">Salvar Alterações</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={12} lg>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Área de Risco</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button color="error">Excluir Conta</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
