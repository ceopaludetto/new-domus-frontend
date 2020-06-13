import * as React from "react";

import { OutlinePerson, OutlineLock, OutlineBusiness } from "mdi-norm";

import { Title, SubTitle, Stepper } from "@/client/components";
import { useStepper } from "@/client/hooks";

interface WizardContextProps {
  values: {
    login: string;
    email: string;
    password: string;
    repeatPassword: string;
  };
  setValues: React.Dispatch<React.SetStateAction<WizardContextProps["values"]>>;
}

const WizardContext = React.createContext<WizardContextProps>({
  values: {
    login: "",
    email: "",
    password: "",
    repeatPassword: "",
  },
  setValues: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});

export default function SignUp() {
  const [currentPage, { toggle }] = useStepper(3);
  const [values, setValues] = React.useState({
    login: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  return (
    <WizardContext.Provider value={{ values, setValues }}>
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
        currentPage={currentPage}
        toggle={toggle}
      />
    </WizardContext.Provider>
  );
}
