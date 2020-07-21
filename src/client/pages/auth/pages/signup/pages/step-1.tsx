import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";
import clsx from "clsx";

import { FormControl, MaskedFormControl, Button, FormCalendar, FormSelect } from "@/client/components";
import { Gender } from "@/client/graphql/operations";
import * as Masks from "@/client/helpers/masks";
import { SignUpStep1Schema, SignUpStep1Values } from "@/client/helpers/validations/signup.schema";
import { StepperContext } from "@/client/hooks";
import u from "@/client/styles/utils.scss";
import { clean } from "@/client/utils/clean";

import { WizardContext } from "../providers";

export default function Step1() {
  const { setValues, values } = React.useContext(WizardContext);
  const { next } = React.useContext(StepperContext);
  const methods = useForm<SignUpStep1Values>({
    resolver: yupResolver(SignUpStep1Schema),
    defaultValues: values,
  });

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
            <FormSelect
              name="gender"
              id="gender"
              label="Gênero"
              items={[
                { value: Gender.M, label: "Masculino" },
                { value: Gender.F, label: "Feminino" },
                { value: Gender.N, label: "Outro" },
              ]}
              required
            />
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
            <FormCalendar disableFuture name="birthdate" id="birthdate" label="Data de Nascimento" required />
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
    </FormProvider>
  );
}
