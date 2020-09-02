import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";

import { useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers";
import clsx from "clsx";

import { FormControl, Button, Divider, PasswordHelper, Text, Switch } from "@/client/components";
import { Me, MeQuery } from "@/client/graphql";
import { SettingsPasswordSchema, SettingsPasswordValues } from "@/client/helpers/validations/settings.schema";
import { useMultipleVisibility } from "@/client/hooks";
import u from "@/client/styles/utils.scss";

export default function Personal() {
  const [mapPropsToField] = useMultipleVisibility(["currentPassword", "newPassword", "repeatNewPassword"]);
  // const { data } = useQuery<MeQuery>(Me);
  const personal = useForm({
    defaultValues: {
      // name: data?.profile.person.name,
      // lastName: data?.profile.person.lastName,
      // email: data?.profile.person.email,
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

  const handlePasswordSubmit = password.handleSubmit((values) => {
    console.log(values);
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
      <FormProvider {...personal}>
        <form onSubmit={handlePersonalSubmit}>
          <div className={clsx(u.grid, u["grid-template"])}>
            <div className={clsx(u["xs-12"], u["md-6"])}>
              <FormControl name="name" label="Nome" id="name" />
            </div>
            <div className={clsx(u["xs-12"], u["md-6"])}>
              <FormControl name="lastName" label="Sobrenome" id="lastName" />
            </div>
          </div>
          <Divider />
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
          <div className={clsx(u.grid, u["grid-template"])}>
            <div className={clsx(u["xs-12"], u["md-6"], u["order-xs-2"], u["order-md-1"], u["mt-xs-4"], u["mt-md-0"])}>
              <FormControl
                name="currentPassword"
                label="Senha"
                id="currentPassword"
                {...mapPropsToField("currentPassword")}
              />
              <FormControl name="newPassword" label="Nova Senha" id="newPassword" {...mapPropsToField("newPassword")} />
              <FormControl
                name="repeatNewPassword"
                label="Repetir Nova Senha"
                id="repeatNewPassword"
                {...mapPropsToField("repeatNewPassword")}
              />
              <div className={u["text-align-xs-right"]}>
                <Button type="submit">Alterar Senha</Button>
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
    </>
  );
}
