import * as React from "react";
import { Helmet } from "react-helmet-async";
import { RiBuilding4Line, RiUserLine, RiLockPasswordLine } from "react-icons/ri";
import { Switch, Route } from "react-router-dom";

import { Typography, Stepper, Step, StepLabel } from "@material-ui/core";

import { StepIcon, StepConnector } from "@/client/components";
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
  const [currentPage, methods] = useStepper(3, async (index: number) => {
    await run(`/auth/signup/step-${index + 1}`);

    history.push(`/auth/signup/step-${index + 1}`);
  });
  const [values, setValues] = React.useState<WizardContextProps["values"]>(initialValues);

  useRedirect("/auth/signup/step-1", { status: 301, staticContext });

  return (
    <WizardContext.Provider value={{ values, setValues }}>
      <StepperContext.Provider value={{ currentPage, ...methods }}>
        <Helmet>
          <title>Cadastro</title>
        </Helmet>
        <Typography component="span" color="primary" variant="subtitle1">
          Cadastro
        </Typography>
        <Typography component="h1" gutterBottom variant="h5">
          Bem vindo
        </Typography>
        <Stepper activeStep={currentPage} connector={<StepConnector />}>
          {items.map((i) => (
            <Step key={i.content}>
              <StepLabel StepIconComponent={StepIcon} StepIconProps={{ icon: i.icon }}>
                {i.content}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Switch>
          {routes?.map(({ name, component: Component, children, ...rest }) => (
            <Route key={name} render={(props) => <Component routes={children} {...props} />} {...rest} />
          ))}
        </Switch>
      </StepperContext.Provider>
    </WizardContext.Provider>
  );
}
