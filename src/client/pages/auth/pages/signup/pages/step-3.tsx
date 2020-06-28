import * as React from "react";
import { useForm, FormContext, ErrorMessage } from "react-hook-form";

import clsx from "clsx";

import { MaskedFormControl, FormControl, FormRadioCard, Button, Switch, ColorText } from "@/client/components";
import * as Masks from "@/client/helpers/masks";
import { SignUpStep3Schema, SignUpStep3Values } from "@/client/helpers/validations/signup.schema";
import { StepperContext, useYupValidationResolver } from "@/client/hooks";
import u from "@/client/styles/utils.scss";
import { clean } from "@/client/utils/clean";

import { WizardContext } from "../providers";

export default function Step3() {
  const validationResolver = useYupValidationResolver(SignUpStep3Schema);
  const { setValues, values } = React.useContext(WizardContext);
  const { next, prev } = React.useContext(StepperContext);
  const methods = useForm<SignUpStep3Values>({
    validationResolver,
    defaultValues: values,
  });
  const type = methods.watch("type");

  function submit(data: SignUpStep3Values) {
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
            <FormRadioCard name="type" value="enter" label="Ingressar condomínio" />
          </div>
          <div className={clsx(u["xs-12"], u["md-6"])}>
            <FormRadioCard name="type" value="create" label="Criar novo condomínio" />
          </div>
        </div>
        {methods.errors.type && (
          <ColorText className={clsx(u["ml-xs-4"], u["-mt-xs-4"], u["mb-xs-4"], u.block)} color="error">
            <ErrorMessage errors={methods.errors} name="type" />
          </ColorText>
        )}
        {type === "create" && (
          <>
            <div className={clsx(u.grid, u["grid-template"])}>
              <div className={clsx(u["xs-12"], u["md-6"])}>
                <FormControl name="razaoSocial" id="razaoSocial" label="Razão Social" required />
              </div>
              <div className={clsx(u["xs-12"], u["md-6"])}>
                <MaskedFormControl
                  rifm={{ format: Masks.cnpj, mask: true }}
                  name="cnpj"
                  id="cnpj"
                  label="CNPJ"
                  required
                />
              </div>
              <div className={clsx(u["xs-12"], u["md-3"])}>
                <MaskedFormControl rifm={{ format: Masks.cep, mask: true }} name="zip" id="zip" label="CEP" required />
              </div>
              <div className={clsx(u["xs-12"], u["md-7"])}>
                <FormControl name="endereco" id="endereco" label="Endereço" required />
              </div>
              <div className={clsx(u["xs-12"], u["md-2"])}>
                <FormControl name="number" id="number" label="Número" required />
              </div>
              <div className={clsx(u["xs-12"], u["md-4"])}>
                <FormControl name="state" id="state" label="Estado" required />
              </div>
              <div className={clsx(u["xs-12"], u["md-8"])}>
                <FormControl name="city" id="city" label="Cidade" required />
              </div>
            </div>
          </>
        )}
        <Switch label="Termos de uso" info="Ao assinar essa opção você concorda com nossos termos de uso." id="terms" />
        <div className={clsx(u.row, u["justify-content-xs-flex-end"])}>
          <div className={u.col}>
            <Button variant="flat" onClick={() => prev()}>
              Voltar
            </Button>{" "}
            <Button variant="raised" type="submit">
              Cadastrar
            </Button>
          </div>
        </div>
      </form>
    </FormContext>
  );
}
