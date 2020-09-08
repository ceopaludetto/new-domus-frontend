import * as React from "react";

import { Gender } from "@/client/graphql";
import type {
  SignUpStep1Values,
  SignUpStep2Values,
  SignUpStep3Values,
} from "@/client/helpers/validations/signup.schema";

export interface WizardContextProps {
  values?: SignUpStep1Values & SignUpStep2Values & SignUpStep3Values;
  setValues: React.Dispatch<React.SetStateAction<WizardContextProps["values"]>>;
}

export const WizardContext = React.createContext<WizardContextProps>({
  values: undefined,
  setValues: () => {},
});

export const initialValues: WizardContextProps["values"] = {
  type: "enter",
  login: "",
  password: "",
  repeatPassword: "",
  person: {
    name: "",
    lastName: "",
    email: "",
    cpf: "",
    gender: Gender.M,
    birthdate: new Date(),
    phone: "",
  },
  condominium: {
    companyName: "",
    cnpj: "",
    address: {
      zip: "",
      city: "",
      state: "",
      address: "",
      number: "",
    },
  },
};
