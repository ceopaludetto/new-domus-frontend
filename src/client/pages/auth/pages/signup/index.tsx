import * as React from "react";
import { Helmet } from "react-helmet-async";
import { FiUser, FiLock, FiBriefcase } from "react-icons/fi";

import loadable from "@loadable/component";
import { Typography, Box } from "@material-ui/core";

import { Tooltip } from "@/client/components";
import { useStepper, useErrorHandler, usePreload, StepperProvider, ErrorHandlerProvider } from "@/client/hooks";

const icons = [<FiUser size={16} />, <FiLock size={16} />, <FiBriefcase size={16} />];
const texts = ["Usuário", "Senha", "Condomínio"];

const Step1 = loadable(() => import("./pages/step-1"));
const Step2 = loadable(() => import("./pages/step-2"));
const Step3 = loadable(() => import("./pages/step-3"));

const steps = [Step1, Step2, Step3];

export default function SignUp() {
  const handler = useErrorHandler();
  const { handlePreloadComponent } = usePreload();

  const stepper = useStepper(3, {
    handleNextPageCallback: async (next) => handlePreloadComponent(steps[next]),
  });

  return (
    <StepperProvider {...stepper}>
      <ErrorHandlerProvider {...handler}>
        <Helmet>
          <title>Cadastro</title>
        </Helmet>
        <Box display="flex" alignItems="flex-start">
          <Box flex="1">
            <Typography component="span" color="primary" variant="h6">
              Cadastro
            </Typography>
            <Typography component="h1" gutterBottom variant="h4">
              Bem vindo
            </Typography>
          </Box>
          <Box>
            <Tooltip title={texts[stepper.current]}>
              <Box borderRadius={9999} display="flex" p={1} color="text.secondary" border={1} borderColor="divider">
                {icons[stepper.current]}
              </Box>
            </Tooltip>
          </Box>
        </Box>
        <Box pt={3}>
          {stepper.isFirst && <Step1 />}
          {stepper.current === 1 && <Step2 />}
          {stepper.isLast && <Step3 />}
        </Box>
      </ErrorHandlerProvider>
    </StepperProvider>
  );
}
