import * as React from "react";

export interface WizardContextProps {
  values?: {
    login: string;
    name: string;
    email: string;
    cpf: string;
    gender: "M" | "F" | "O" | "";
    tel: string;
    birthdate: Date;
    password: string;
    repeatPassword: string;
    type: "create" | "enter" | "";
  };
  setValues: React.Dispatch<React.SetStateAction<WizardContextProps["values"]>>;
}

export const WizardContext = React.createContext<WizardContextProps>({
  values: {
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
  },
  setValues: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});
