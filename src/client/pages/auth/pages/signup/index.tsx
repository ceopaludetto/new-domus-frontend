import * as React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useLocalStorage } from "react-use";

import { OutlinePerson, OutlineLock, OutlineBusiness } from "mdi-norm";

import { Title, SubTitle, Stepper } from "@/client/components";
import { useStepper, StepperContext, usePreload } from "@/client/hooks";
import { RouteComponentProps } from "@/client/utils/common.dto";

import { WizardContext, WizardContextProps } from "./providers";

export default function SignUp({ routes }: RouteComponentProps) {
  const [, { run }] = usePreload(false);
  const history = useHistory();
  const [currentPage, methods] = useStepper(3);
  const [values, setValues] = useLocalStorage<WizardContextProps["values"]>("@DOMUS:AUTH:SIGNUP", {
    login: "",
    name: "",
    email: "",
    cpf: "",
    gender: "",
    tel: "",
    birthdate: new Date(),
    password: "",
    repeatPassword: "",
    type: "",
  });

  return (
    <WizardContext.Provider value={{ values, setValues }}>
      <StepperContext.Provider value={{ currentPage, ...methods }}>
        <SubTitle>Cadastro</SubTitle>
        <Title>Nova Conta</Title>
        <Stepper
          items={[
            {
              content: "Usuário",
              icon: OutlinePerson,
            },
            {
              content: "Senha",
              icon: OutlineLock,
            },
            {
              content: "Condomínio",
              icon: OutlineBusiness,
            },
          ]}
          clickable={false}
          onStepChange={(index: number) => {
            run(`/auth/signup/step-${index + 1}`).then(() => {
              history.push(`/auth/signup/step-${index + 1}`);
            });
          }}
        />
        <Switch>
          {routes?.map(({ name, component: Component, children, ...rest }) => (
            <Route key={name} render={(props) => <Component routes={children} {...props} />} {...rest} />
          ))}
        </Switch>
      </StepperContext.Provider>
    </WizardContext.Provider>
  );
}
