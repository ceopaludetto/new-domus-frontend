import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";
import clsx from "clsx";

import { SubTitle, Title, FormControl, Button, PreloadLink, Link } from "@/client/components";
import { ForgotSchema, ForgotValues } from "@/client/helpers/validations/forgot.schema";
import u from "@/client/styles/utils.scss";

export default function Forgot() {
  const methods = useForm<ForgotValues>({ resolver: yupResolver(ForgotSchema) });

  const submit = methods.handleSubmit((data) => {
    console.log(data); // eslint-disable-line no-console
    /**
     * TODO:
     * [] Forgot logic
     */
  });

  return (
    <FormProvider {...methods}>
      <form noValidate autoComplete="on" onSubmit={submit}>
        <Helmet>
          <title>Esqueceu a senha</title>
        </Helmet>
        <SubTitle>Esqueceu a senha</SubTitle>
        <Title>Recuperar Senha</Title>
        <FormControl label="Login" name="login" id="login" autoFocus />
        <div className={u["pt-xs-2"]}>
          <Button disabled={methods.formState.isSubmitting} block variant="raised" type="submit">
            Recuperar Senha
          </Button>
        </div>
        <div className={clsx(u["text-align-xs-center"], u["mt-xs-5"])}>
          <PreloadLink as={Link} button color="primary" to="/auth/signin">
            Voltar para Login
          </PreloadLink>
        </div>
      </form>
    </FormProvider>
  );
}
