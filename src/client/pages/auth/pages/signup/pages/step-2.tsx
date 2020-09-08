import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";
import clsx from "clsx";

import { FormControl, Button, PasswordHelper, Text } from "@/client/components";
import { SignUpStep2Schema, SignUpStep2Values } from "@/client/helpers/validations/signup.schema";
import { StepperContext, useMultipleVisibility } from "@/client/hooks";
import u from "@/client/styles/utils.module.scss";
import { clean } from "@/client/utils/clean";

import { WizardContext } from "../providers";

export default function Step2() {
  const [getVisibilityProps] = useMultipleVisibility(["password", "repeatPassword"]);
  const { setValues, values } = React.useContext(WizardContext);
  const { next, prev } = React.useContext(StepperContext);
  const methods = useForm<SignUpStep2Values>({
    resolver: yupResolver(SignUpStep2Schema),
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

  const submit = methods.handleSubmit((data) => {
    if (values) {
      setValues({ ...values, ...clean(data) });
      next();
    }
  });

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={submit}>
        <div className={clsx(u.grid, u["grid-template"])}>
          <div className={clsx(u["xs-12"], u["md-6"], u["order-xs-2"], u["order-md-1"], u["mt-xs-4"], u["mt-md-0"])}>
            <FormControl
              autoFocus
              name="password"
              id="password"
              label="Senha"
              required
              autoComplete="off"
              aria-describedby="password-constraint-1 password-constraint-2 password-constraint-3"
              {...getVisibilityProps("password")}
            />
            <FormControl
              name="repeatPassword"
              id="repeatPassword"
              label="Repetir Senha"
              required
              autoComplete="off"
              {...getVisibilityProps("repeatPassword")}
            />
          </div>
          <div className={clsx(u["xs-12"], u["md-6"], u["order-xs-1"], u["order-md-2"], u["mb-xs-3"], u["mb-md-0"])}>
            <Text as="label" variant="body-1" htmlFor="password">
              Dicas de Senha
            </Text>
            <div className={u["mt-xs-3"]}>
              <PasswordHelper id="password-constraint-1" active={passwordHelp.oneNumber}>
                Pelo menos 1 número.
              </PasswordHelper>
              <PasswordHelper id="password-constraint-2" active={passwordHelp.oneUpper}>
                Pelo menos 1 caractere maiúsculo.
              </PasswordHelper>
              <PasswordHelper id="password-constraint-3" active={passwordHelp.min}>
                No mínimo 6 caracteres.
              </PasswordHelper>
            </div>
          </div>
        </div>
        <div className={clsx(u.row, u["justify-content-xs-flex-end"], u["mt-xs-3"])}>
          <div className={u.col}>
            <Button variant="flat" onClick={() => prev()}>
              Voltar
            </Button>{" "}
            <Button variant="contained" type="submit">
              Próximo
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
