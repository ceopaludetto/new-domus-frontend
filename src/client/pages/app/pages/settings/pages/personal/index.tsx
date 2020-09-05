import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";

import { useQuery, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers";
import type { UserInputError } from "apollo-server-express";
import clsx from "clsx";

import {
  FormControl,
  FormCalendar,
  MaskedFormControl,
  Button,
  Divider,
  PasswordHelper,
  Text,
  Switch,
} from "@/client/components";
import { Me, MeQuery, ChangePassword, ChangePasswordMutation, ChangePasswordMutationVariables } from "@/client/graphql";
import * as Masks from "@/client/helpers/masks";
import { tel } from "@/client/helpers/masks";
import {
  SettingsPasswordSchema,
  SettingsPasswordValues,
  SettingsPersonalSchema,
  SettingsPersonalValues,
} from "@/client/helpers/validations/settings.schema";
import { useMultipleVisibility } from "@/client/hooks";
import u from "@/client/styles/utils.scss";
import type { Client } from "@/client/utils/common.dto";

export default function Personal() {
  const [passwordGenericError, setPasswordGenericError] = React.useState(false);
  const [mapPropsToField] = useMultipleVisibility(["currentPassword", "newPassword", "repeatNewPassword"]);
  const { data } = useQuery<MeQuery>(Me);
  const [changePassword] = useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePassword);

  const personal = useForm<SettingsPersonalValues>({
    resolver: yupResolver(SettingsPersonalSchema),
    defaultValues: {
      name: data?.profile.person.name,
      lastName: data?.profile.person.lastName,
      login: data?.profile.login,
      email: data?.profile.person.email,
      phone: tel(`${data?.profile.person.phones[0].ddd}${data?.profile.person.phones[0].number}`),
      birthdate: data?.profile.person.birthdate,
    },
  });

  const password = useForm<SettingsPasswordValues>({
    resolver: yupResolver(SettingsPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
  });
  const newPasswordValue = password.watch("newPassword");

  const handlePersonalSubmit = personal.handleSubmit((values) => {
    console.log(values);
  });

  const handlePasswordSubmit = password.handleSubmit(async ({ currentPassword, newPassword }) => {
    setPasswordGenericError(false);
    try {
      await changePassword({
        variables: {
          input: {
            currentPassword,
            newPassword,
          },
        },
      });
    } catch (error) {
      const graphQLError = (error.graphQLErrors as UserInputError[])[0];
      if (graphQLError.extensions.fields) {
        const field: "currentPassword" = graphQLError.extensions.fields[0];
        password.setError(field, {
          type: "graphql",
          message: graphQLError.message,
        });
      } else {
        setPasswordGenericError(true);
      }
    }
  });

  const passwordHelp = React.useMemo(() => {
    return {
      oneNumber: /\d/.test(newPasswordValue),
      oneUpper: /[A-Z]/.test(newPasswordValue),
      min: newPasswordValue.length >= 6,
    };
  }, [newPasswordValue]);

  return (
    <>
      <Helmet title="Configurações - Informações Pessoais" />
      <FormProvider {...personal}>
        <form onSubmit={handlePersonalSubmit}>
          <div className={clsx(u.grid, u["grid-template"])}>
            <div className={clsx(u["xs-12"], u["md-6"])}>
              <FormControl autoFocus name="name" label="Nome" id="name" />
            </div>
            <div className={clsx(u["xs-12"], u["md-6"])}>
              <FormControl name="lastName" label="Sobrenome" id="lastName" />
            </div>
            <div className={clsx(u["xs-12"], u["md-6"])}>
              <FormControl name="login" label="Login" id="login" />
            </div>
            <div className={clsx(u["xs-12"], u["md-6"])}>
              <FormControl name="email" label="E-mail" id="email" />
            </div>
            <div className={clsx(u["xs-12"], u["md-6"])}>
              <MaskedFormControl rifm={{ format: Masks.tel }} name="phone" label="Telefone" id="phone" />
            </div>
            <div className={clsx(u["xs-12"], u["md-6"])}>
              <FormCalendar name="birthdate" label="Data de Nascimento" id="birthdate" />
            </div>
          </div>
          <Switch
            color="primary"
            label="Conta pública"
            info="Ser visível a todos usuários do condomínio atual."
            id="terms"
          />
          <div className={u["text-align-xs-right"]}>
            <Button type="submit">Alterar Informações</Button>
          </div>
        </form>
      </FormProvider>
      <Divider content="Senha" />
      <FormProvider {...password}>
        <form onSubmit={handlePasswordSubmit}>
          {passwordGenericError && (
            <Text variant="body-2" color="error">
              Falha ao alterar senha
            </Text>
          )}
          <div className={clsx(u.grid, u["grid-template"])}>
            <div className={clsx(u["xs-12"], u["md-6"], u["order-xs-2"], u["order-md-1"], u["mt-xs-4"], u["mt-md-0"])}>
              <FormControl
                autoComplete="password"
                name="currentPassword"
                label="Senha Atual"
                id="currentPassword"
                {...mapPropsToField("currentPassword")}
              />
              <FormControl
                autoComplete="off"
                name="newPassword"
                label="Nova Senha"
                id="newPassword"
                {...mapPropsToField("newPassword")}
              />
              <FormControl
                autoComplete="off"
                name="repeatNewPassword"
                label="Repetir Nova Senha"
                id="repeatNewPassword"
                {...mapPropsToField("repeatNewPassword")}
              />
              <div className={u["text-align-xs-right"]}>
                <Button disabled={password.formState.isSubmitting} type="submit">
                  Alterar Senha
                </Button>
              </div>
            </div>
            <div className={clsx(u["xs-12"], u["md-6"], u["order-xs-1"], u["order-md-2"])}>
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
        </form>
      </FormProvider>
      <Divider content="Área de Risco" />
      <Button variant="flat" color="error">
        Excluir Conta
      </Button>
    </>
  );
}

Personal.fetchBefore = async (client: Client) => {
  await client.query<MeQuery>({ query: Me });
};
