import { FormProvider, useForm } from "react-hook-form";

import { Button, Grid } from "@mui/material";

import { MaskedTextField, Page, Section, TextField } from "@/client/components";
import { useSelectedCondominium } from "@/client/utils/hooks";
import * as Masks from "@/client/utils/mask";

export default function ApplicationSettingsCondominium() {
  const [selectedCondominium] = useSelectedCondominium();
  const form = useForm({
    defaultValues: {
      name: selectedCondominium?.name,
      cnpj: selectedCondominium?.cnpj,
      character: selectedCondominium?.character,
    },
  });

  return (
    <Page title="Condomínio" inner>
      <Section title="Informações de Condomínio" description="Preencha com cuidado e verifique a validade dos dados.">
        <FormProvider {...form}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <TextField name="name" id="name" label="Nome do Condomínio" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MaskedTextField rifm={Masks.cnpj} name="cnpj" id="cnpj" label="CNPJ" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField name="character" id="character" label="Caractere Especial" />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button>Salvar Alterações</Button>
            </Grid>
          </Grid>
        </FormProvider>
      </Section>
    </Page>
  );
}
