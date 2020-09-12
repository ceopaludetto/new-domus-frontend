import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";
import { FiX } from "react-icons/fi";

import { useQuery, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers";
import { Grid, Button, Divider, Box, Typography, Snackbar, IconButton } from "@material-ui/core";
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
  const [snackbarContent, setSnackbarContent] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [mapPropsToField] = useMultipleVisibility(["currentPassword", "newPassword", "repeatNewPassword"]);
  const { data } = useQuery<MeQuery>(Me);
  const [changePassword] = useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePassword);
  const [changeUserData] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUser);

  const personal = useForm<SettingsPersonalValues>({
    resolver: yupResolver(SettingsPersonalSchema),
    defaultValues: {
      name: data?.profile.person.name,
      lastName: data?.profile.person.lastName,
      cpf: Masks.cpf(data?.profile.person.cpf),
      login: data?.profile.login,
      email: data?.profile.person.email,
      phone: Masks.tel(`${data?.profile.person.phones[0].ddd}${data?.profile.person.phones[0].number}`),
      birthdate: data?.profile.person.birthdate,
      publicAccount: false,
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

  const handlePersonalSubmit = personal.handleSubmit(async ({ login, birthdate, phone, publicAccount, ...rest }) => {
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

      setSnackbarContent("Informações pessoais alteradas com sucesso!");
      setSnackbarOpen(true);

      personal.reset(personal.getValues());
    } catch (error) {
      const graphQLError = (error?.graphQLErrors as UserInputError[])[0];
      if (graphQLError?.extensions?.fields) {
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

      setSnackbarContent("Senha alterada com sucesso!");
      setSnackbarOpen(true);

      password.reset();
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

  function handleClose() {
    setSnackbarOpen(false);
  }

  return (
    <>
      <Snackbar
        message={snackbarContent}
        open={snackbarOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={5000}
        action={
          <IconButton size="small" onClick={handleClose} color="inherit">
            <FiX />
          </IconButton>
        }
      />
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
              <FormCalendar disableFuture name="birthdate" label="Data de Nascimento" id="birthdate" />
            </Grid>
          </Grid>
          <Box mt={2}>
            <FormSwitch
              label="Conta pública"
              info="Ser visível a todos usuários do condomínio atual."
              id="publicAccount"
              name="publicAccount"
            />
          </Box>
          <Box textAlign="right">
            <Button
              disabled={personal.formState.isSubmitting || !personal.formState.isDirty}
              color="primary"
              variant="contained"
              type="submit"
            >
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
            <Box clone order={{ xs: 13, md: -1 }}>
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
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={password.formState.isSubmitting || !password.formState.isDirty}
                    type="submit"
                  >
                    Alterar Senha
                  </Button>
                </Box>
              </Grid>
            </Box>
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
      <Box textAlign="center" pt={1} pb={3}>
        <Button variant="text" color="secondary">
          Excluir Conta
        </Button>
      </Box>
    </>
  );
}

Personal.fetchBefore = async (client: Client) => {
  await client.query<MeQuery>(Me);
};
