import * as React from "react";
import { useForm, FormProvider, get } from "react-hook-form";

import { useQuery, ApolloClient } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers";
import clsx from "clsx";

import {
  MaskedFormControl,
  FormControl,
  FormSelect,
  FormRadioCard,
  Button,
  Switch,
  ColorText,
} from "@/client/components";
import { ShowStatesQuery } from "@/client/graphql/operations";
import { ShowStates } from "@/client/graphql/state.gql";
import * as Masks from "@/client/helpers/masks";
import { SignUpStep3Schema, SignUpStep3Values } from "@/client/helpers/validations/signup.schema";
import { StepperContext } from "@/client/hooks";
import u from "@/client/styles/utils.scss";
import { clean } from "@/client/utils/clean";

import { WizardContext } from "../providers";

export default function Step3() {
  const { setValues, values } = React.useContext(WizardContext);
  const { prev } = React.useContext(StepperContext);
  const methods = useForm<SignUpStep3Values>({
    resolver: yupResolver(SignUpStep3Schema),
    defaultValues: values,
  });
  const type = methods.watch("type");
  const state = methods.watch("state");
  const { data } = useQuery<ShowStatesQuery>(ShowStates);

  const submit = methods.handleSubmit((datas) => {
    if (values) {
      setValues({ ...values, ...clean(datas) });
    }
  });

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={submit}>
        <div className={clsx(u.grid, u["grid-template"])}>
          <div className={clsx(u["xs-12"], u["md-6"])}>
            <FormRadioCard name="type" value="enter" label="Ingressar condomínio" />
          </div>
          <div className={clsx(u["xs-12"], u["md-6"])}>
            <FormRadioCard name="type" value="create" label="Criar novo condomínio" />
          </div>
        </div>
        {methods.errors.type && (
          <ColorText className={clsx(u["ml-xs-4"], u["-mt-xs-3"], u["mb-xs-4"], u.block)} small color="error">
            {get(methods.errors, "type.message")}
          </ColorText>
        )}
        {type === "create" && (
          <>
            <div className={clsx(u.grid, u["grid-template"])}>
              <div className={clsx(u["xs-12"], u["md-6"])}>
                <FormControl name="companyName" id="companyName" label="Razão Social" required />
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
                <FormControl name="address" id="address" label="Endereço" required />
              </div>
              <div className={clsx(u["xs-12"], u["md-2"])}>
                <FormControl name="number" id="number" label="Número" required />
              </div>
              <div className={clsx(u["xs-12"], u["md-4"])}>
                <FormSelect
                  items={
                    data?.showStates.map((st) => ({
                      value: st.id,
                      label: st.name,
                    })) ?? []
                  }
                  name="state"
                  id="state"
                  label="Estado"
                  required
                />
              </div>
              {!!state && (
                <div className={clsx(u["xs-12"], u["md-8"])}>
                  <FormSelect
                    items={
                      data?.showStates
                        ?.find((st) => st.id === state)
                        ?.cities.map((c) => ({
                          value: c.id,
                          label: c.name,
                        })) ?? []
                    }
                    name="city"
                    id="city"
                    label="Cidade"
                    required
                  />
                </div>
              )}
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
    </FormProvider>
  );
}

Step3.fetchBefore = async (client: ApolloClient<object>) => {
  await client.query<ShowStatesQuery>({ query: ShowStates });
};
