import { makeVar } from "@apollo/client";

import type {
  SignUpStep1Values,
  SignUpStep2Values,
  SignUpStep3Values,
} from "@/client/helpers/validations/signup.schema";
import { Gender } from "@/client/utils/types";

export const initialValues: SignUpStep1Values & SignUpStep2Values & SignUpStep3Values = {
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

export const wizard = makeVar<SignUpStep1Values & SignUpStep2Values & SignUpStep3Values>(initialValues);
