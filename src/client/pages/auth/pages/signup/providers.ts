import * as React from "react";

import { SignUpStep1Values, SignUpStep2Values, SignUpStep3Values } from "@/client/helpers/validations/signup.schema";

export interface WizardContextProps {
  values?: SignUpStep1Values & SignUpStep2Values & SignUpStep3Values;
  setValues: React.Dispatch<React.SetStateAction<WizardContextProps["values"]>>;
}

export const WizardContext = React.createContext<WizardContextProps>({
  values: undefined,
  setValues: () => {},
});

export const initialValues: WizardContextProps["values"] = {
  type: null,
  login: "",
  password: "",
  repeatPassword: "",
  person: {
    name: "",
    lastName: "",
    email: "",
    cpf: "",
    gender: null,
    birthdate: new Date(),
    phone: "",
  },
  condominium: {
    companyName: "",
    cnpj: "",
    address: {
      zip: "",
      cityID: "",
      stateID: "",
      address: "",
      number: "",
    },
  },
};
