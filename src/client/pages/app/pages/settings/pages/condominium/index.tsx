import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { FiX, FiPlus } from "react-icons/fi";

import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Button, IconButton } from "@material-ui/core";

import { FormControl, MaskedFormControl, Tooltip, Divider } from "@/client/components";
import {
  SelectedCondominiumDocument,
  SelectedCondominiumQuery,
  MeDocument,
  MeQuery,
  useUpdateCondominiumMutation,
} from "@/client/graphql/index.graphql";
import * as Masks from "@/client/helpers/masks";
import { CondominiumSchema, CondominiumValues } from "@/client/helpers/validations/condominium.schema";
import { useCurrentCondominium, useErrorHandler, useSnackbarContext } from "@/client/hooks";
import { submitDisabled } from "@/client/utils/form";
import type { PreloadOptions } from "@/client/utils/types";

export default function Condominium() {
  const [updateCondominium] = useUpdateCondominiumMutation();
  const { handleOpen } = useSnackbarContext();

  const condominium = useCurrentCondominium();
  const { handleError } = useErrorHandler();

  const methods = useForm<CondominiumValues>({
    resolver: yupResolver(CondominiumSchema),
    defaultValues: {
      id: condominium?.id,
      companyName: condominium?.companyName,
      cnpj: Masks.cnpj.format(condominium?.cnpj),
      character: condominium?.character,
      rules: condominium?.rules.map((rule) => ({ id: rule.id, description: rule.description })) ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({ name: "rules", control: methods.control, keyName: "key" });

  useEffect(() => {
    const { id } = methods.getValues();

    if (id !== condominium?.id) {
      methods.reset({
        id: condominium?.id,
        companyName: condominium?.companyName,
        cnpj: Masks.cnpj.format(condominium?.cnpj),
        character: condominium?.character,
        rules: condominium?.rules.map((rule) => ({ id: rule.id, description: rule.description })) ?? [],
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condominium]);

  const handleSumbmit = methods.handleSubmit(
    handleError<CondominiumValues>(async ({ id, rules, ...rest }) => {
      await updateCondominium({
        variables: { input: { rules: rules ?? [], ...rest } },
      });

      handleOpen("Informações de condomínio alteradas com sucesso!");
    }, methods.setError)
  );

  return (
    <>
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
            {fields.length >= 1 && (
              <>
                <Grid item xs={12}>
                  <Divider>Regras</Divider>
                </Grid>
                {fields.map((field, index) => (
                  <Grid item xs={12} key={field.key}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs>
                        <input
                          type="hidden"
                          defaultValue={field.id}
                          {...methods.register(`rules.${index}.id` as const)}
                        />
                        <FormControl
                          label={`Regra ${index + 1}`}
                          name={`rules.${index}.description`}
                          defaultValue={field.description}
                        />
                      </Grid>
                      <Grid item>
                        <Tooltip title={`Remover Regra ${index + 1}`}>
                          <IconButton onClick={() => remove(index)} aria-label={`Remover Regra ${index + 1}`}>
                            <FiX />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </>
            )}
            <Grid item xs={12}>
              <Grid container justify="space-between">
                <Grid item>
                  <Button
                    startIcon={<FiPlus />}
                    variant="contained"
                    color="secondary"
                    onClick={() => append({ description: "" })}
                  >
                    Adicionar Nova Regra
                  </Button>
                </Grid>
                <Grid item>
                  <Button disabled={submitDisabled(methods)} variant="contained" color="primary" type="submit">
                    Alterar Informações
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
}

Condominium.fetchBefore = async ({ client }: PreloadOptions) => {
  await client.query<SelectedCondominiumQuery>({ query: SelectedCondominiumDocument });
  await client.query<MeQuery>({ query: MeDocument });
};
