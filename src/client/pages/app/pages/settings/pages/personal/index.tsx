import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";

import { useQuery, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers";
import { Grid, Button, Divider, Box, Typography } from "@material-ui/core";
import type { UserInputError } from "apollo-server-express";

import { FormControl, FormSwitch, FormCalendar, MaskedFormControl, PasswordHelper } from "@/client/components";
import {
  Me,
  MeQuery,
  UpdateUser,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  ChangePassword,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from "@/client/graphql";
import * as Masks from "@/client/helpers/masks";
import {
  SettingsPasswordSchema,
  SettingsPasswordValues,
  SettingsPersonalSchema,
  SettingsPersonalValues,
} from "@/client/helpers/validations/settings.schema";
import { useMultipleVisibility } from "@/client/hooks";
import type { Client } from "@/client/utils/common.dto";
import { splitPhone } from "@/client/utils/string";

export default function Personal() {
  const [passwordGenericError, setPasswordGenericError] = React.useState(false);
  const [personalGenericError, setPersonalGenericError] = React.useState(false);
  const [mapPropsToField] = useMultipleVisibility(["currentPassword", "newPassword", "repeatNewPassword"]);
  const { data } = useQuery<MeQuery>(Me);
  const [changePassword] = useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePassword);
  const [changeUserData] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUser);

  const personal = useForm<SettingsPersonalValues>({
    resolver: yupResolver(SettingsPersonalSchema),
    defaultValues: {
      name: data?.profile.person.name,
      lastName: data?.profile.person.lastName,
      cpf: data?.profile.person.cpf,
      login: data?.profile.login,
      email: data?.profile.person.email,
      phone: `${data?.profile.person.phones[0].ddd}${data?.profile.person.phones[0].number}`,
      birthdate: data?.profile.person.birthdate,
    },
  });

  const password = useForm<SettingsPasswordValues>({
    resolver: yupResolver(SettingsPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
  });
  const newPasswordValue = password.watch("newPassword");

  const handlePersonalSubmit = personal.handleSubmit(async ({ login, birthdate, phone, ...rest }) => {
    setPersonalGenericError(false);
    try {
      await changeUserData({
        variables: {
          input: {
            login,
            person: {
              birthdate: birthdate as Date,
              phones: phone ? [splitPhone(phone)] : undefined,
              ...rest,
            },
          },
        },
      });
    } catch (error) {
      const graphQLError = (error.graphQLErrors as UserInputError[])[0];
      if (graphQLError.extensions.fields) {
        const field: "currentPassword" = graphQLError.extensions.fields[0];
        personal.setError(field, {
          type: "graphql",
          message: graphQLError.message,
        });
      } else {
        setPersonalGenericError(true);
      }
    }
  });

  const handlePasswordSubmit = password.handleSubmit(async ({ currentPassword, newPassword }) => {
    setPasswordGenericError(false);
    try {
      await changePassword({
        variables: {
          input: {
            currentPassword,
            newPassword,
          },
        },
      });
    } catch (error) {
      const graphQLError = (error.graphQLErrors as UserInputError[])[0];
      if (graphQLError.extensions.fields) {
        const field: "currentPassword" = graphQLError.extensions.fields[0];
        password.setError(field, {
          type: "graphql",
          message: graphQLError.message,
        });
      } else {
        setPasswordGenericError(true);
      }
    }
  });

  const passwordHelp = React.useMemo(() => {
    return {
      oneNumber: /\d/.test(newPasswordValue),
      oneUpper: /[A-Z]/.test(newPasswordValue),
      min: newPasswordValue.length >= 6,
    };
  }, [newPasswordValue]);

  return (
    <>
      <Helmet title="Configurações - Informações Pessoais" />
      <FormProvider {...personal}>
        <form onSubmit={handlePersonalSubmit}>
          {personalGenericError && (
            <Typography variant="body2" color="error">
              Falha ao alterar dados de usuário
            </Typography>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl autoFocus name="name" label="Nome" id="name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl name="lastName" label="Sobrenome" id="lastName" />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl name="login" label="Login" id="login" />
            </Grid>
            <Grid item xs={12} md={8}>
              <FormControl name="email" label="E-mail" id="email" />
            </Grid>
            <Grid item xs={12} md={4}>
              <MaskedFormControl rifm={{ format: Masks.cpf }} name="cpf" label="CPF" id="cpf" />
            </Grid>
            <Grid item xs={12} md={4}>
              <MaskedFormControl rifm={{ format: Masks.tel }} name="phone" label="Telefone" id="phone" />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormCalendar name="birthdate" label="Data de Nascimento" id="birthdate" />
            </Grid>
          </Grid>
          <Box mt={2}>
            <FormSwitch
              label="Conta pública"
              info="Ser visível a todos usuários do condomínio atual."
              id="public-account"
              name="public-account"
            />
          </Box>
          <Box textAlign="right">
            <Button color="primary" variant="contained" type="submit">
              Alterar Informações
            </Button>
          </Box>
        </form>
      </FormProvider>
      <Box my={2}>
        <Divider />
      </Box>
      <FormProvider {...password}>
        <form onSubmit={handlePasswordSubmit}>
          {passwordGenericError && (
            <Typography variant="body2" color="error">
              Falha ao alterar senha
            </Typography>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl
                    autoComplete="password"
                    name="currentPassword"
                    label="Senha Atual"
                    id="currentPassword"
                    {...mapPropsToField("currentPassword")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    autoComplete="off"
                    name="newPassword"
                    label="Nova Senha"
                    id="newPassword"
                    {...mapPropsToField("newPassword")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    autoComplete="off"
                    name="repeatNewPassword"
                    label="Repetir Nova Senha"
                    id="repeatNewPassword"
                    {...mapPropsToField("repeatNewPassword")}
                  />
                </Grid>
              </Grid>
              <Box textAlign="right" mt={2}>
                <Button color="primary" variant="contained" disabled={password.formState.isSubmitting} type="submit">
                  Alterar Senha
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography component="label" color="textPrimary" htmlFor="newPassword">
                Dicas de Senha
              </Typography>
              <Box mt={2}>
                <PasswordHelper id="password-constraint-1" active={passwordHelp.oneNumber}>
                  Pelo menos 1 número.
                </PasswordHelper>
                <PasswordHelper id="password-constraint-2" active={passwordHelp.oneUpper}>
                  Pelo menos 1 caractere maiúsculo.
                </PasswordHelper>
                <PasswordHelper id="password-constraint-3" active={passwordHelp.min}>
                  No mínimo 6 caracteres.
                </PasswordHelper>
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <Box my={2}>
        <Divider />
      </Box>
      <Button variant="text" color="secondary">
        Excluir Conta
      </Button>
    </>
  );
}

Personal.fetchBefore = async (client: Client) => {
  await client.query<MeQuery>({ query: Me });
};
