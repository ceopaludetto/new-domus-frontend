import { FormProvider, useForm } from "react-hook-form";

import { Button, Grid } from "@mui/material";

import { MaskedTextField, Page, Section, TextField } from "@/client/components";
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
    <Page title="Conta" actions={{ remove: true }}>
      <Section title="Informações Pessoais" description="Preencha com cuidado e verifique a validade dos dados.">
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
      </Section>
      <Section title="Área de risco" description="Excluir conta, transferir sindicato.">
        content
      </Section>
    </Page>
  );
}
