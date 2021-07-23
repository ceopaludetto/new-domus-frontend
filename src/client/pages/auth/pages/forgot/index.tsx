import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useInterval } from "react-use";

import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography, Button, Box, Link } from "@material-ui/core";

import { PreloadLink, TextField, AuthPaper } from "@/client/components";
import { useForgotMutation } from "@/client/graphql";
import { useErrorHandler, usePreload } from "@/client/helpers/hooks";
import { ForgotSchema, ForgotValues } from "@/client/helpers/validations/forgot.schema";
import type { RouteComponentProps } from "@/client/utils/types";

export default function AuthForgot({ history }: RouteComponentProps) {
  const [seconds, setSeconds] = useState(5);
  const { preload } = usePreload();
  const [forgot, { data }] = useForgotMutation();

  const form = useForm<ForgotValues>({
    resolver: yupResolver(ForgotSchema),
    defaultValues: { login: "" },
  });

  const [handleErrorAndSubmit] = useErrorHandler(form);

  const handleSubmit = handleErrorAndSubmit(async (values) => {
    await forgot({ variables: { input: { ...values, callback: "http://localhost:3001/auth/reset" } } });
    await preload("/auth/signin");
  });

  useInterval(() => setSeconds((current) => current - 1), data?.forgot && seconds ? 1000 : null);

  useEffect(() => {
    if (seconds <= 0) {
      history.push("/auth/signin");
    }
  }, [seconds, history]);

  if (data?.forgot) {
    return (
      <Box>
        <AuthPaper>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="primary">
                Esqueceu a senha
              </Typography>
              <Typography variant="h4" color="textPrimary" component="h1">
                Recuperar
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Um e-mail contendo detalhes para a recuperação foi enviado para{" "}
                <Typography component="span" color="primary">
                  {data.forgot}
                </Typography>
                !
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2">Voltando para login em {seconds} segundos.</Typography>
            </Grid>
            <Grid item>
              <Box textAlign="right">
                <Button component={PreloadLink} to="/auth/signin" color="primary">
                  Voltar Agora
                </Button>
              </Box>
            </Grid>
          </Grid>
        </AuthPaper>
      </Box>
    );
  }

  return (
    <Box>
      <AuthPaper>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="primary">
                  Esqueceu a senha
                </Typography>
                <Typography variant="h4" color="textPrimary" component="h1">
                  Recuperar
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField name="login" id="login" label="Login" />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                  Recuperar
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </AuthPaper>
      <Box mt={2} textAlign="center">
        <Typography>
          Está perdido?{" "}
          <Link component={PreloadLink} to="/auth/signin">
            Voltar para Login
          </Link>
          .
        </Typography>
      </Box>
    </Box>
  );
}
