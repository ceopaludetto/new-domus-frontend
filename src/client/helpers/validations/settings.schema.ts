import * as Yup from "yup";

import * as Messages from "../constants";

import "../customs";

export const SettingsPasswordSchema = Yup.object({
  currentPassword: Yup.string().required(Messages.REQUIRED),
  newPassword: Yup.string()
    .notOneOf([Yup.ref("currentPassword"), ""], Messages.NEW_PASSWORD)
    .min(6, Messages.MIN)
    .matches(/\d/, Messages.ONE_NUMBER)
    .matches(/[A-Z]/, Messages.ONE_UPPER)
    .required(Messages.REQUIRED),
  repeatNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], Messages.REPEAT_PASSWORD)
    .required(Messages.REQUIRED),
}).required();

export type SettingsPasswordValues = Yup.InferType<typeof SettingsPasswordSchema>;

export const SettingsPersonalSchema = Yup.object({
  name: Yup.string().required(Messages.REQUIRED),
  lastName: Yup.string().required(Messages.REQUIRED),
  cpf: Yup.string().cpf().required(Messages.REQUIRED),
  login: Yup.string().login().required(Messages.REQUIRED),
  email: Yup.string().email(Messages.EMAIL).required(Messages.REQUIRED),
  birthdate: Yup.date().typeError(Messages.DATE).required(Messages.REQUIRED),
  phones: Yup.array(
    Yup.object({
      number: Yup.string()
        .matches(/\([\d]{2}\) \d?[\d]{4}-[\d]{4}/, Messages.TEL)
        .required(),
    }).required()
  ).required(),
  publicAccount: Yup.bool(),
}).required();

export type SettingsPersonalValues = Yup.InferType<typeof SettingsPersonalSchema>;
