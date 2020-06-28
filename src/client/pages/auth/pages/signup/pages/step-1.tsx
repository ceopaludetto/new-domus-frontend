import * as React from "react";
import { useForm, FormContext } from "react-hook-form";

import clsx from "clsx";

import { FormControl, MaskedFormControl, Button } from "@/client/components";
import * as Masks from "@/client/helpers/masks";
import { SignUpStep1Schema, SignUpStep1Values } from "@/client/helpers/validations/signup.schema";
import { StepperContext, useYupValidationResolver } from "@/client/hooks";
import u from "@/client/styles/utils.scss";
import { clean } from "@/client/utils/clean";

import { WizardContext } from "../providers";

export default function Step1() {
  const validationResolver = useYupValidationResolver(SignUpStep1Schema);
  const { setValues, values } = React.useContext(WizardContext);
  const { next } = React.useContext(StepperContext);
  const methods = useForm<SignUpStep1Values>({
    validationResolver,
    defaultValues: values,
  });

  function submit(data: SignUpStep1Values) {
    if (values) {
      setValues({ ...values, ...clean(data) });
      next();
    }
  }

  return (
    <FormContext {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(submit)}>
        <div className={clsx(u.grid, u["grid-template"])}>
          <div className={clsx(u["xs-12"], u["md-6"])}>
            <FormControl name="login" id="login" label="Login" required />
          </div>
          <div className={clsx(u["xs-12"], u["md-6"])}>
            <FormControl name="name" id="name" label="Nome" required />
          </div>
          <div className={clsx(u["xs-12"])}>
            <FormControl name="email" id="email" label="E-mail" required />
          </div>
          <div className={clsx(u["xs-12"], u["md-6"])}>
            <MaskedFormControl
              rifm={{ format: Masks.cpf, accept: /\d+/g, mask: true }}
              name="cpf"
              id="cpf"
              label="CPF"
              required
            />
          </div>
          <div className={clsx(u["xs-12"], u["md-6"])}>
            <FormControl name="gender" id="gender" label="Gênero" required />
          </div>
          <div className={clsx(u["xs-12"], u["md-6"])}>
            <MaskedFormControl
              rifm={{ format: Masks.tel, accept: /\d+/g, mask: true }}
              name="tel"
              id="tel"
              label="Telefone"
              required
            />
          </div>
          <div className={clsx(u["xs-12"], u["md-6"])}>
            <FormControl name="birthdate" id="birthdate" label="Data de Nascimento" required />
          </div>
        </div>
        <div className={clsx(u.row, u["justify-content-xs-flex-end"])}>
          <div className={u.col}>
            <Button variant="raised" type="submit">
              Próximo
            </Button>
          </div>
        </div>
      </form>
    </FormContext>
  );
}
