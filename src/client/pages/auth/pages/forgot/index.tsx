import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useInterval } from "react-use";

import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers";
import { Button, Typography, Box } from "@material-ui/core";

import { FormControl, PreloadLink } from "@/client/components";
import { AuthForgot, AuthForgotMutation, AuthForgotMutationVariables } from "@/client/graphql";
import { ForgotSchema, ForgotValues } from "@/client/helpers/validations/forgot.schema";
import { usePreload } from "@/client/hooks";

export default function Forgot() {
  const [forgot, { data }] = useMutation<AuthForgotMutation, AuthForgotMutationVariables>(AuthForgot);
  const methods = useForm<ForgotValues>({ resolver: yupResolver(ForgotSchema) });
  const [submitted, setSubmitted] = React.useState(false);
  const [time, setTime] = React.useState(5);
  const [, run] = usePreload();
  const history = useHistory();

  useInterval(
    async () => {
      if (submitted) {
        if (time > 1) {
          setTime((curr) => curr - 1);
        } else {
          await run("/auth/signin");
          history.push("/auth/signin");
        }
      }
    },
    submitted ? 1000 : undefined
  );

  const submit = methods.handleSubmit(async (values) => {
    try {
      const callback = `${window.location.origin}/auth/recover`;

      await forgot({
        variables: {
          input: { ...values, callback },
        },
      });

      setSubmitted(true);
    } catch (error) {
      const message = error?.message ?? "Usuário não encontrado";

      methods.setError("login", {
        type: "graphql",
        message,
      });
    }
  });

  return (
    <FormProvider {...methods}>
      <form autoComplete="on" onSubmit={submit}>
        <Helmet>
          <title>Esqueceu a senha</title>
        </Helmet>
        <Typography component="span" color="primary" variant="subtitle1">
          Esqueceu a senha
        </Typography>
        <Typography component="h1" gutterBottom variant="h5">
          Recuperar Senha
        </Typography>
        {submitted ? (
          <>
            <Typography gutterBottom>
              Um e-mail com instruções de recuperação de senha foi enviado para {data?.forgot}!
            </Typography>
            <Typography variant="caption">
              Você será redirecionado em {time} segundo{time !== 1 && "s"}.
            </Typography>
            <Box textAlign="right" mt={3}>
              <Button component={PreloadLink} variant="text" color="primary" to="/auth/signin">
                Ir agora
              </Button>
            </Box>
          </>
        ) : (
          <>
            <FormControl label="Login" name="login" id="login" autoFocus />
            <Box mt={2}>
              <Button
                disabled={methods.formState.isSubmitting}
                fullWidth
                color="primary"
                variant="contained"
                type="submit"
                size="large"
              >
                Recuperar Senha
              </Button>
            </Box>
            <Box mt={2}>
              <Button component={PreloadLink} variant="text" fullWidth size="large" color="primary" to="/auth/signin">
                Voltar para Login
              </Button>
            </Box>
          </>
        )}
      </form>
    </FormProvider>
  );
}
