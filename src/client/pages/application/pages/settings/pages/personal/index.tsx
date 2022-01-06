import { FormProvider, useForm } from "react-hook-form";

import { Button, Grid } from "@mui/material";

import { MaskedTextField, TextField } from "@/client/components";
import { useProfileQuery } from "@/client/graphql";
import * as Masks from "@/client/utils/mask";

export default function ApplicationSettingsPersonal() {
  const [{ data }] = useProfileQuery();
  const form = useForm({
    defaultValues: {
      email: data?.profile.email,
      cpf: data?.profile.person.cpf,
      firstName: data?.profile.person.firstName,
      lastName: data?.profile.person.lastName,
      phone: data?.profile.person.phone,
    },
  });

  return (
    <FormProvider {...form}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <TextField label="Nome" name="firstName" id="firstName" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField label="Sobrenome" name="lastName" id="lastName" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField label="E-mail" name="email" id="email" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <MaskedTextField rifm={Masks.cpf} label="CPF" name="cpf" id="cpf" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField label="Data de Nascimento" name="birthDate" id="birthDate" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <MaskedTextField rifm={Masks.phone} label="Telefone" name="phone" id="phone" />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <Button type="submit">Salvar Alterações</Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
