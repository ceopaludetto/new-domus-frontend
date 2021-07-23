import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Typography } from "@material-ui/core";

import { TextField, PasswordHelper, SubmitButton } from "@/client/components";
import { useChangePasswordMutation } from "@/client/graphql";
import { useMultipleVisibility } from "@/client/helpers/hooks";
import { SettingsPasswordSchema, SettingsPasswordValues } from "@/client/helpers/validations/settings.schema";
import { snackbarStorage } from "@/client/providers/storages";

export function Password() {
  const [mapVisibility] = useMultipleVisibility(["currentPassword", "newPassword", "repeatNewPassword"]);
  const [changePassword] = useChangePasswordMutation();

  const form = useForm<SettingsPasswordValues>({
    resolver: yupResolver(SettingsPasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", repeatNewPassword: "" },
  });

  const handleSubmit = form.handleSubmit(async ({ currentPassword, newPassword }) => {
    await changePassword({ variables: { input: { currentPassword, newPassword } } });
    snackbarStorage({ message: "Senha alterada com sucesso!" });
  });

  const newPassword = form.watch("newPassword");
  const passwordHelpers = useMemo(
    () => ({
      min: newPassword.length >= 6,
      oneNumber: /\d/.test(newPassword),
      oneUpper: /[A-Z]/.test(newPassword),
    }),
    [newPassword]
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="currentPassword"
                  id="currentPassword"
                  label="Senha Atual"
                  {...mapVisibility("currentPassword")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField name="newPassword" id="newPassword" label="Nova Senha" {...mapVisibility("newPassword")} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="repeatNewPassword"
                  id="repeatNewPassword"
                  label="Repetir Nova Senha"
                  {...mapVisibility("repeatNewPassword")}
                />
              </Grid>
              <Grid item xs={12}>
                <Box textAlign="right">
                  <SubmitButton color="primary" variant="contained">
                    Alterar Senha
                  </SubmitButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography color="primary" variant="subtitle1">
                Dicas de senha
              </Typography>
            </Box>
            <PasswordHelper active={passwordHelpers.min}>Pelo menos seis caracteres</PasswordHelper>
            <PasswordHelper active={passwordHelpers.oneNumber}>Pelo menos um número</PasswordHelper>
            <PasswordHelper active={passwordHelpers.oneUpper}>Pelo menos uma letra maiúscula</PasswordHelper>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
