import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useInterval } from "react-use";

import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers";
import clsx from "clsx";

import { FormControl, Button, PreloadLink, Text } from "@/client/components";
import { AuthForgot, AuthForgotMutation, AuthForgotMutationVariables } from "@/client/graphql";
import { ForgotSchema, ForgotValues } from "@/client/helpers/validations/forgot.schema";
import { usePreload } from "@/client/hooks";
import u from "@/client/styles/utils.scss";

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
      <form noValidate autoComplete="on" onSubmit={submit}>
        <Helmet>
          <title>Esqueceu a senha</title>
        </Helmet>
        <Text as="span" color="primary" variant="subtitle-1">
          Esqueceu a senha
        </Text>
        <Text gutter as="h1" variant="headline-5">
          Recuperar Senha
        </Text>
        {submitted ? (
          <>
            <Text>Um e-mail com instruções de recuperação de senha foi enviado para {data?.forgot}!</Text>
            <Text variant="caption">
              Você será redirecionado em {time} segundo{time !== 1 && "s"}.
            </Text>
            <div className={clsx(u["text-align-xs-right"], u["mt-xs-5"])}>
              <PreloadLink as={Button} variant="flat" to="/auth/signin">
                Ir agora
              </PreloadLink>
            </div>
          </>
        ) : (
          <>
            <FormControl label="Login" name="login" id="login" autoFocus />
            <div className={u["pt-xs-2"]}>
              <Button disabled={methods.formState.isSubmitting} block variant="contained" type="submit">
                Recuperar Senha
              </Button>
            </div>
            <div className={clsx(u["text-align-xs-center"], u["mt-xs-4"])}>
              <PreloadLink as={Button} variant="flat" block color="primary" to="/auth/signin">
                Voltar para Login
              </PreloadLink>
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
}
