import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Box, Button } from "@material-ui/core";

import { FormControl, MaskedFormControl } from "@/client/components";
import {
  SelectedCondominiumDocument,
  SelectedCondominiumQuery,
  MeDocument,
  MeQuery,
  useUpdateCondominiumMutation,
} from "@/client/graphql";
import * as Masks from "@/client/helpers/masks";
import { CondominiumSchema, CondominiumValues } from "@/client/helpers/validations/condominium.schema";
import { useCurrentCondominium, useErrorHandler, useSnackbar, SnackbarWrapper } from "@/client/hooks";
import { submitDisabled } from "@/client/utils/form";
import type { Client } from "@/client/utils/types";

export default function Condominium() {
  const [updateCondominium] = useUpdateCondominiumMutation();
  const snackbarControls = useSnackbar();

  const condominium = useCurrentCondominium();
  const { handleError } = useErrorHandler();

  const methods = useForm<CondominiumValues>({
    resolver: yupResolver(CondominiumSchema),
    defaultValues: {
      id: condominium?.id,
      companyName: condominium?.companyName,
      cnpj: Masks.cnpj.format(condominium?.cnpj),
      character: condominium?.character,
    },
  });

  React.useEffect(() => {
    const { id } = methods.getValues();

    if (id !== condominium?.id) {
      methods.reset({
        id: condominium?.id,
        companyName: condominium?.companyName,
        cnpj: Masks.cnpj.format(condominium?.cnpj),
        character: condominium?.character,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condominium]);

  const handleSumbmit = methods.handleSubmit(
    handleError<CondominiumValues>(async ({ id, ...rest }) => {
      await updateCondominium({ variables: { input: rest } });

      snackbarControls.handleOpen("Informações alteradas com sucesso!");
    }, methods.setError)
  );

  return (
    <>
      <SnackbarWrapper {...snackbarControls} />
      <Helmet title="Configurações - Condomínio" />
      <FormProvider {...methods}>
        <form onSubmit={handleSumbmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl autoFocus name="companyName" id="companyName" label="Razão Social" />
            </Grid>
            <Grid item xs={12} md={6}>
              <MaskedFormControl rifm={Masks.cnpj} name="cnpj" id="cnpj" label="CNPJ" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl name="character" id="character" label="Caractere Especial" inputProps={{ maxLength: "1" }} />
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="right">
                <Button disabled={submitDisabled(methods)} variant="contained" color="primary" type="submit">
                  Alterar Informações
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
}

Condominium.fetchBefore = async (client: Client) => {
  await client.query<SelectedCondominiumQuery>({ query: SelectedCondominiumDocument });
  await client.query<MeQuery>({ query: MeDocument });
};
