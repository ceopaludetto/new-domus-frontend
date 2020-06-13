import * as React from "react";
import { useForm, FormContext } from "react-hook-form";

import clsx from "clsx";

import { SubTitle, Title, FormControl, Button, PreloadLink, Link } from "@/client/components";
import { ForgotSchema, ForgotValues } from "@/client/helpers/validations/forgot.schema";
import { useYupValidationResolver } from "@/client/hooks";
import u from "@/client/styles/utils.scss";

export default function Forgot() {
  const validationResolver = useYupValidationResolver(ForgotSchema);
  const methods = useForm<ForgotValues>({ validationResolver });

  function submit(data: ForgotValues) {
    console.log(data);
  }

  return (
    <FormContext {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(submit)}>
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
    </FormContext>
  );
}
