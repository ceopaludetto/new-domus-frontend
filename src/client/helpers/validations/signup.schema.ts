import * as Yup from "yup";

import * as Messages from "../constants";

export const SignUpStep1Schema = Yup.object({
  login: Yup.string().required(Messages.REQUIRED),
  name: Yup.string().required(Messages.REQUIRED),
  lastName: Yup.string().required(Messages.REQUIRED),
  email: Yup.string().email(Messages.EMAIL).required(Messages.REQUIRED),
  tel: Yup.string().matches(/\([\d]{2}\) \d?[\d]{4}-[\d]{4}/, Messages.TEL),
  birthdate: Yup.date().typeError(Messages.DATE).required(Messages.REQUIRED),
});

export const SignUpStep2Schema = Yup.object({
  password: Yup.string()
    .min(6, Messages.MIN)
    .matches(/\d/, Messages.ONE_NUMBER)
    .matches(/[A-Z]/, Messages.ONE_UPPER)
    .required(Messages.REQUIRED),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], Messages.REPEAT_PASSWORD)
    .required(Messages.REQUIRED),
});

export const SignUpStep3Schema = Yup.object({
  type: Yup.string().oneOf(["enter", "create", null], Messages.STEP_3_TYPE).required(Messages.REQUIRED),
  companyName: Yup.string().when("type", {
    is: "create",
    then: (schema: Yup.StringSchema) => schema.required(Messages.REQUIRED),
  }),
  cnpj: Yup.string().when("type", {
    is: "create",
    then: (schema: Yup.StringSchema) =>
      schema.matches(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/, Messages.CNPJ).required(Messages.REQUIRED),
  }),
  zip: Yup.string().when("type", {
    is: "create",
    then: (schema: Yup.StringSchema) => schema.matches(/\d{5}-\d{3}/, Messages.ZIP).required(Messages.REQUIRED),
  }),
  address: Yup.string().when("type", {
    is: "create",
    then: (schema: Yup.StringSchema) => schema.required(Messages.REQUIRED),
  }),
  number: Yup.string().when("type", {
    is: "create",
    then: (schema: Yup.StringSchema) => schema.required(Messages.REQUIRED),
  }),
  state: Yup.string()
    .nullable()
    .when("type", {
      is: "create",
      then: (schema: Yup.StringSchema) => schema.required(Messages.REQUIRED),
    }),
  city: Yup.string()
    .nullable()
    .when("type", {
      is: "create",
      then: (schema: Yup.StringSchema) => schema.required(Messages.REQUIRED),
    }),
});

export type SignUpStep1Values = Yup.InferType<typeof SignUpStep1Schema>;
export type SignUpStep2Values = Yup.InferType<typeof SignUpStep2Schema>;
export type SignUpStep3Values = Yup.InferType<typeof SignUpStep3Schema>;
