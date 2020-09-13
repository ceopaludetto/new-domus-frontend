import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";

import { Grid } from "@material-ui/core";

import { FormControl, MaskedFormControl } from "@/client/components";
import { SelectedCondominium, SelectedCondominiumQuery, Me, MeQuery } from "@/client/graphql";
import * as Masks from "@/client/helpers/masks";
import { useCurrentCondominium } from "@/client/hooks";
import type { Client } from "@/client/utils/common.dto";

export default function Condominium() {
  const condominium = useCurrentCondominium();
  const methods = useForm({
    defaultValues: {
      companyName: condominium?.companyName,
      cnpj: Masks.cnpj(condominium?.cnpj),
      character: condominium?.character,
    },
  });

  return (
    <FormProvider {...methods}>
      <Helmet title="Configurações - Condomínio" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl autoFocus name="companyName" id="companyName" label="Razão Social" />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedFormControl rifm={{ format: Masks.cnpj, mask: true }} autoFocus name="cnpj" id="cnpj" label="CNPJ" />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl name="character" id="character" label="Caractere Especial" inputProps={{ maxLength: "1" }} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}

Condominium.fetchBefore = async (client: Client) => {
  await client.query<SelectedCondominiumQuery>(SelectedCondominium);
  await client.query<MeQuery>(Me);
};
