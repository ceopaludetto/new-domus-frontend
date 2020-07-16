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
      <form noValidate onSubmit={submit}>
        <Helmet>
          <title>Esqueceu a senha</title>
        </Helmet>
        <SubTitle>Esqueceu a senha</SubTitle>
        <Title>Recuperar Senha</Title>
        <FormControl
          label="Login"
          name="login"
          id="login"
          helperText={
            <PreloadLink as={Link} to="/auth/signin">
              Está perdido?
            </PreloadLink>
          }
        />
        <div className={clsx(u.row, u["justify-content-xs-flex-end"])}>
          <div className={u.col}>
            <Button variant="raised" type="submit">
              Recuperar
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
