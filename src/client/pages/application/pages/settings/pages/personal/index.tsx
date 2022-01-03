import { FormProvider, useForm } from "react-hook-form";

import { Button, Grid, Typography } from "@mui/material";

import { TextField } from "@/client/components";
import { useProfileQuery } from "@/client/graphql";

export default function ApplicationSettingsPersonal() {
  const { data } = useProfileQuery();
  const form = useForm({
    defaultValues: {
      email: data?.profile.email,
      firstName: data?.profile.person.firstName,
      lastName: data?.profile.person.lastName,
      phone: data?.profile.person.phone,
    },
  });

  return (
    <FormProvider {...form}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Informações Pessoais</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField label="E-mail" name="email" id="email" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField label="Nome" name="firstName" id="firstName" />
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
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <Button type="submit">Salvar Alterações</Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
