import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FiPlus, FiMinus } from "react-icons/fi";

import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Box, IconButton, InputAdornment } from "@material-ui/core";

import { MaskTextField, TextField, Divider, Tooltip, SubmitButton } from "@/client/components";
import { useUpdateCondominiumMutation } from "@/client/graphql";
import { useSelectedCondominium } from "@/client/helpers/hooks/use-selected-condominium";
import * as Masks from "@/client/helpers/masks";
import { CondominiumSchema, CondominiumValues } from "@/client/helpers/validations/condominium.schema";
import { snackbarStorage } from "@/client/providers/storages";

export default function AppSettingsCondominium() {
  const [condominium] = useSelectedCondominium();
  const [update] = useUpdateCondominiumMutation();

  const form = useForm<CondominiumValues>({
    resolver: yupResolver(CondominiumSchema),
    defaultValues: {
      companyName: condominium?.companyName,
      character: condominium?.character,
      cnpj: Masks.cnpj.format(condominium?.cnpj),
      rules: condominium?.rules ?? [{ description: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "rules", keyName: "key" });

  const handleSubmit = form.handleSubmit(async ({ rules, ...rest }) => {
    const data = {
      rules: rules.map(({ id, description }) => ({ id, description })),
      ...rest,
    };

    await update({ variables: { input: data } });
    snackbarStorage({ message: "Condomínio atualizado com sucesso!" });

    form.reset(data);
  });

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField name="companyName" id="companyName" label="Nome do Condomínio" required />
          </Grid>
          <Grid item xs={12} md={6}>
            <MaskTextField rifm={Masks.cnpj} name="cnpj" id="cnpj" label="CNPJ" required />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="character" id="character" label="Caractere" required />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs>
                <Divider>Regras</Divider>
              </Grid>
              <Grid item>
                <Tooltip title="Nova Regra">
                  <IconButton onClick={() => append({ description: "" })} aria-label="Nova Regra">
                    <FiPlus />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          {fields.map((item, index) => (
            <Grid key={item.key} item xs={12} md={6}>
              <TextField
                id={`rules.${index}`}
                label={`Regra ${index + 1}`}
                name={`rules.${index}.description`}
                defaultValue={item.description}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Remover Regra">
                        <IconButton onClick={() => remove(index)} aria-label="Remover Regra">
                          <FiMinus />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box textAlign="right">
              <SubmitButton color="primary" variant="contained">
                Alterar Informações
              </SubmitButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
