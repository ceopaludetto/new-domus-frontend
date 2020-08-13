import * as React from "react";
import { Helmet } from "react-helmet-async";
import { RiBuilding4Line, RiUserLine, RiLockPasswordLine } from "react-icons/ri";
import { Switch, Route } from "react-router-dom";
import { useLocalStorage } from "react-use";

import { Stepper, Text } from "@/client/components";
import { useStepper, StepperContext, usePreload, useRedirect } from "@/client/hooks";
import type { RouteComponentProps } from "@/client/utils/common.dto";

import { WizardContext, WizardContextProps, initialValues } from "./providers";

const items = [
  {
    content: "Usuário",
    icon: RiUserLine,
  },
  {
    content: "Senha",
    icon: RiLockPasswordLine,
  },
  {
    content: "Condomínio",
    icon: RiBuilding4Line,
  },
];

export default function SignUp({ routes, history, staticContext }: RouteComponentProps) {
  const [, run] = usePreload();
  const [currentPage, methods] = useStepper(3);
  const [values, setValues] = useLocalStorage<WizardContextProps["values"]>("@DOMUS:AUTH:SIGNUP", initialValues);

  useRedirect("/auth/signup/step-1", { status: 301, staticContext });

  return (
    <WizardContext.Provider value={{ values, setValues }}>
      <StepperContext.Provider value={{ currentPage, ...methods }}>
        <Helmet>
          <title>Cadastro</title>
        </Helmet>
        <Text as="span" color="primary" variant="subtitle-1">
          Cadastro
        </Text>
        <Text gutter as="h1" variant="headline-5">
          Bem vindo
        </Text>
        <Stepper
          items={items}
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
