import * as Yup from "yup";

import { Gender } from "@/client/graphql";

import * as Messages from "../constants";

import "../customs";

export const SignUpStep1Schema = Yup.object({
  login: Yup.string().login().required(Messages.REQUIRED),
  person: Yup.object({
    name: Yup.string().required(Messages.REQUIRED),
    lastName: Yup.string().required(Messages.REQUIRED),
    cpf: Yup.string().cpf().required(Messages.REQUIRED),
    gender: Yup.mixed<Gender>()
      .nullable()
      .oneOf([null, Gender.M, Gender.F, Gender.N], Messages.GENDER)
      .required(Messages.REQUIRED),
    email: Yup.string().email(Messages.EMAIL).required(Messages.REQUIRED),
    birthdate: Yup.date().typeError(Messages.DATE).required(Messages.REQUIRED),
    phone: Yup.string().matches(/\([\d]{2}\) \d?[\d]{4}-[\d]{4}/, Messages.TEL),
  }).required(),
}).required();

export const SignUpStep2Schema = Yup.object({
  password: Yup.string()
    .min(6, Messages.MIN)
    .matches(/\d/, Messages.ONE_NUMBER)
    .matches(/[A-Z]/, Messages.ONE_UPPER)
    .required(Messages.REQUIRED),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], Messages.REPEAT_PASSWORD)
    .required(Messages.REQUIRED),
}).required();

export const SignUpStep3Schema = Yup.object({
  type: Yup.mixed<"enter" | "create" | null>()
    .oneOf(["enter", "create", null], Messages.STEP_3_TYPE)
    .required(Messages.REQUIRED),
  condominium: Yup.object({
    companyName: Yup.string().required(Messages.REQUIRED),
    cnpj: Yup.string()
      .cnpj()
      .matches(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/, Messages.CNPJ)
      .required(Messages.REQUIRED),
    address: Yup.object({
      zip: Yup.string()
        .matches(/\d{5}-\d{3}/, Messages.ZIP)
        .required(Messages.REQUIRED),
      address: Yup.string().required(Messages.REQUIRED),
      number: Yup.string().required(Messages.REQUIRED),
      state: Yup.string().nullable().required(Messages.REQUIRED),
      city: Yup.string().nullable().required(Messages.REQUIRED),
    }).required(),
  }).when("type", {
    is: "create",
    then: (schema: Yup.ObjectSchema<any>) => schema.required(Messages.REQUIRED),
  }),
}).required();

export type SignUpStep1Values = Yup.InferType<typeof SignUpStep1Schema>;
export type SignUpStep2Values = Yup.InferType<typeof SignUpStep2Schema>;
export type SignUpStep3Values = Yup.InferType<typeof SignUpStep3Schema>;
