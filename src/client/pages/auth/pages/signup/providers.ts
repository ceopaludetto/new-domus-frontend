import * as React from "react";

export interface WizardContextProps {
  values?: {
    login: string;
    name: string;
    lastName: string;
    email: string;
    cpf: string;
    gender: "M" | "F" | "O" | "";
    tel: string;
    birthdate: Date;
    password: string;
    repeatPassword: string;
    type: "create" | "enter" | "";
    companyName?: string;
    address?: string;
    cnpj?: string;
    city?: string | null;
    state?: string | null;
    zip?: string;
    number?: string;
  };
  setValues: React.Dispatch<React.SetStateAction<WizardContextProps["values"]>>;
}

export const WizardContext = React.createContext<WizardContextProps>({
  values: {
    login: "",
    name: "",
    lastName: "",
    email: "",
    cpf: "",
    gender: "",
    tel: "",
    birthdate: new Date(),
    password: "",
    repeatPassword: "",
    type: "",
    companyName: "",
    address: "",
    cnpj: "",
    state: null,
    city: null,
    zip: "",
    number: "",
  },
  setValues: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});
