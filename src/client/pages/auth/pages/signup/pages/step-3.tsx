import * as React from "react";
import { useForm, FormProvider, get } from "react-hook-form";

import { useQuery, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers";
import clsx from "clsx";

import { MaskedFormControl, FormControl, FormSelect, FormRadioCard, Button, Switch, Text } from "@/client/components";
import { Register, ShowStates } from "@/client/graphql";
import { ShowStatesQuery, RegisterMutation, RegisterMutationVariables, Gender } from "@/client/graphql/operations";
import * as Masks from "@/client/helpers/masks";
import { SignUpStep3Schema, SignUpStep3Values } from "@/client/helpers/validations/signup.schema";
import { StepperContext } from "@/client/hooks";
import u from "@/client/styles/utils.scss";
import { clean } from "@/client/utils/clean";
import type { Client } from "@/client/utils/common.dto";
import { splitPhone } from "@/client/utils/string";

import { WizardContext, initialValues } from "../providers";

export default function Step3() {
  const { setValues, values } = React.useContext(WizardContext);
  const { prev } = React.useContext(StepperContext);
  const methods = useForm<SignUpStep3Values>({
    resolver: yupResolver(SignUpStep3Schema),
    defaultValues: values,
  });
  const type = methods.watch("type");
  const state = methods.watch("condominium.address.stateID");
  const [register] = useMutation<RegisterMutation, RegisterMutationVariables>(Register);
  const { data } = useQuery<ShowStatesQuery>(ShowStates);

  const submit = methods.handleSubmit(async (datas) => {
    try {
      if (values) {
        setValues({ ...values, ...clean(datas) });
        const {
          login,
          password,
          person: { phone, gender, ...person },
          condominium: {
            address: { cityID, stateID, ...address },
            ...condominium
          },
        } = values;

        if (cityID) {
          const res = await register({
            variables: {
              input: {
                login,
                password,
                person: {
                  ...person,
                  gender: gender ?? Gender.M,
                  phones: phone ? [splitPhone(phone)] : [],
                  condominiums: [{ ...condominium, address: { cityID, ...address } }],
                },
              },
            },
          });

          if (res && res.data) {
            setValues(initialValues);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={submit}>
        <div className={clsx(u.grid, u["grid-template"])}>
          <div className={clsx(u["xs-12"], u["md-6"])}>
            <FormRadioCard autoFocus name="type" value="enter" label="Ingressar condomínio" />
          </div>
          <div className={clsx(u["xs-12"], u["md-6"])}>
            <FormRadioCard name="type" value="create" label="Criar novo condomínio" />
          </div>
        </div>
        {methods.errors.type && (
          <Text variant="body-2" className={clsx(u["ml-xs-4"], u["-mt-xs-3"], u["mb-xs-4"], u.block)} color="error">
            {get(methods.errors, "type.message")}
          </Text>
        )}
        {type === "create" && (
          <>
            <div className={clsx(u.grid, u["grid-template"])}>
              <div className={clsx(u["xs-12"], u["md-6"])}>
                <FormControl name="condominium.companyName" array id="companyName" label="Razão Social" required />
              </div>
              <div className={clsx(u["xs-12"], u["md-6"])}>
                <MaskedFormControl
                  rifm={{ format: Masks.cnpj, mask: true }}
                  name="condominium.cnpj"
                  id="cnpj"
                  label="CNPJ"
                  required
                />
              </div>
              <div className={clsx(u["xs-12"], u["md-3"])}>
                <MaskedFormControl
                  rifm={{ format: Masks.cep, mask: true }}
                  name="condominium.address.zip"
                  id="zip"
                  label="CEP"
                  required
                />
              </div>
              <div className={clsx(u["xs-12"], u["md-6"])}>
                <FormControl name="condominium.address.address" id="address" label="Endereço" required />
              </div>
              <div className={clsx(u["xs-12"], u["md-3"])}>
                <FormControl name="condominium.address.number" id="number" label="Número" required />
              </div>
              <div className={clsx(u["xs-12"], u["md-4"])}>
                <FormSelect
                  items={
                    data?.showStates.map((st) => ({
                      value: st.id,
                      label: st.name,
                    })) ?? []
                  }
                  name="condominium.address.stateID"
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
                    name="condominium.address.cityID"
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
        <div className={clsx(u.row, u["justify-content-xs-flex-end"], u["mt-xs-3"])}>
          <div className={u.col}>
            <Button variant="flat" onClick={() => prev()}>
              Voltar
            </Button>{" "}
            <Button variant="contained" type="submit">
              Cadastrar
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

Step3.fetchBefore = async (client: Client) => {
  await client.query<ShowStatesQuery>({ query: ShowStates });
};
