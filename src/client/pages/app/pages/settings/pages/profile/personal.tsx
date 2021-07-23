import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { FiPlus, FiMinus } from "react-icons/fi";

import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Box, IconButton, InputAdornment } from "@material-ui/core";
import dayjs from "dayjs";

import { TextField, MaskTextField, KeyboardDatePicker, Divider, Tooltip, SubmitButton } from "@/client/components";
import { useMeQuery, useUpdateProfileMutation } from "@/client/graphql";
import * as Masks from "@/client/helpers/masks";
import { SettingsPersonalSchema, SettingsPersonalValues } from "@/client/helpers/validations/settings.schema";
import { snackbarStorage } from "@/client/providers/storages";

export function Personal() {
  const { data } = useMeQuery();
  const [update] = useUpdateProfileMutation();

  const form = useForm<SettingsPersonalValues>({
    resolver: yupResolver(SettingsPersonalSchema),
    defaultValues: {
      name: data?.profile.person.name,
      lastName: data?.profile.person.lastName,
      login: data?.profile.login,
      email: data?.profile.person.email,
      cpf: Masks.cpf.format(data?.profile.person.cpf),
      birthdate: dayjs(data?.profile.person.birthdate),
      phones: data?.profile.person.phones.map((phone) => ({ number: Masks.tel.format(phone) })),
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: "phones", keyName: "key" });

  const handleSubmit = form.handleSubmit(async ({ phones, login, ...rest }) => {
    const values = { person: { ...rest, phones: phones.map((phone) => phone.number) } };

    await update({ variables: { input: values } });
    snackbarStorage({ message: "Usuário atualizado com sucesso!" });

    form.reset({ ...values.person, phones: values.person.phones.map((phone) => ({ number: phone })), login });
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField name="name" id="name" label="Nome" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="lastName" id="lastName" label="Sobrenome" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="login" id="login" label="Login" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="email" id="email" label="E-mail" />
          </Grid>
          <Grid item xs={6}>
            <MaskTextField rifm={Masks.cpf} id="cpf" label="CPF" name="cpf" />
          </Grid>
          <Grid item xs={6}>
            <KeyboardDatePicker id="birthdate" label="Data de Nascimento" name="birthdate" disableFuture />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs>
                <Divider>Telefones</Divider>
              </Grid>
              <Grid item>
                <Tooltip title="Novo Telefone">
                  <IconButton onClick={() => append({ number: "" })} aria-label="Novo Telefone">
                    <FiPlus />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          {fields.map((item, index) => (
            <Grid key={item.key} item xs={12} md={6}>
              <MaskTextField
                rifm={Masks.tel}
                id={`phones.${index}`}
                label={`Telefone ${index + 1}`}
                name={`phones.${index}.number`}
                InputProps={{
                  endAdornment: fields.length > 1 && (
                    <InputAdornment position="end">
                      <Tooltip title="Remover Telefone">
                        <IconButton onClick={() => remove(index)} aria-label="Remover Telefone">
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
