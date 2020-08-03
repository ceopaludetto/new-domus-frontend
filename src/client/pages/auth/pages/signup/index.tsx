import * as React from "react";
import { Helmet } from "react-helmet-async";
import { FiUser, FiLock, FiMap } from "react-icons/fi";
import { Switch, Route } from "react-router-dom";
import { useLocalStorage } from "react-use";

import { Title, SubTitle, Stepper } from "@/client/components";
import { useStepper, StepperContext, usePreload, useRedirect } from "@/client/hooks";
import { RouteComponentProps } from "@/client/utils/common.dto";

import { WizardContext, WizardContextProps, initialValues } from "./providers";

export default function SignUp({ routes, history, location, staticContext }: RouteComponentProps) {
  const [, run] = usePreload();
  const [currentPage, methods] = useStepper(3);
  const [values, setValues] = useLocalStorage<WizardContextProps["values"]>("@DOMUS:AUTH:SIGNUP", initialValues);

  useRedirect({ url: "/auth/signup/step-1", location, history, staticContext }, 301);

  return (
    <WizardContext.Provider value={{ values, setValues }}>
      <StepperContext.Provider value={{ currentPage, ...methods }}>
        <Helmet>
          <title>Cadastro</title>
        </Helmet>
        <SubTitle>Cadastro</SubTitle>
        <Title>Bem vindo</Title>
        <Stepper
          items={[
            {
              content: "Usuário",
              icon: FiUser,
            },
            {
              content: "Senha",
              icon: FiLock,
            },
            {
              content: "Condomínio",
              icon: FiMap,
            },
          ]}
          clickable={false}
          onStepChange={async (index: number) => {
            await run(`/auth/signup/step-${index + 1}`);
            history.push(`/auth/signup/step-${index + 1}`);
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
