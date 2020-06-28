import * as React from "react";
import { useForm, FormContext } from "react-hook-form";

import clsx from "clsx";

import { FormControl, Button, Label, PasswordHelper } from "@/client/components";
import { SignUpStep2Schema, SignUpStep2Values } from "@/client/helpers/validations/signup.schema";
import { StepperContext, useYupValidationResolver, useMultipleVisibility } from "@/client/hooks";
import u from "@/client/styles/utils.scss";
import { clean } from "@/client/utils/clean";

import { WizardContext } from "../providers";

export default function Step2() {
  const validationResolver = useYupValidationResolver(SignUpStep2Schema);
  const [getVisibilityProps] = useMultipleVisibility(["password", "repeatPassword"]);
  const { setValues, values } = React.useContext(WizardContext);
  const { next, prev } = React.useContext(StepperContext);
  const methods = useForm<SignUpStep2Values>({
    validationResolver,
    defaultValues: values,
  });
  const password = methods.watch("password");

  const passwordHelp = React.useMemo(() => {
    return {
      oneNumber: /\d/.test(password),
      oneUpper: /[A-Z]/.test(password),
      min: password.length >= 6,
    };
  }, [password]);

  function submit(data: SignUpStep2Values) {
    if (values) {
      setValues({ ...values, ...clean(data) });
      next();
    }
  }

  return (
    <FormContext {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(submit)}>
        <div className={clsx(u.grid, u["grid-template"])}>
          <div className={clsx(u["xs-12"], u["md-6"], u["order-xs-2"], u["order-md-1"], u["mt-xs-4"], u["mt-md-0"])}>
            <FormControl name="password" id="password" label="Senha" required {...getVisibilityProps("password")} />
            <FormControl
              name="repeatPassword"
              id="repeatPassword"
              label="Repetir Senha"
              required
              {...getVisibilityProps("repeatPassword")}
            />
          </div>
          <div className={clsx(u["xs-12"], u["md-6"], u["order-xs-1"], u["order-md-2"])}>
            <Label htmlFor="password">Dicas de Senha</Label>
            <PasswordHelper active={passwordHelp.oneNumber}>Pelo menos 1 número.</PasswordHelper>
            <PasswordHelper active={passwordHelp.oneUpper}>Pelo menos 1 caractere maiúsculo.</PasswordHelper>
            <PasswordHelper active={passwordHelp.min}>No mínimo 6 caracteres.</PasswordHelper>
          </div>
        </div>
        <div className={clsx(u.row, u["justify-content-xs-flex-end"])}>
          <div className={u.col}>
            <Button variant="flat" onClick={() => prev()}>
              Voltar
            </Button>{" "}
            <Button variant="raised" type="submit">
              Próximo
            </Button>
          </div>
        </div>
      </form>
    </FormContext>
  );
}
