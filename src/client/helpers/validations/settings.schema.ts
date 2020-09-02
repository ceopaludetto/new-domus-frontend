import * as Yup from "yup";

import * as Messages from "../constants";

export const SettingsPasswordSchema = Yup.object({
  currentPassword: Yup.string()
    .min(6, Messages.MIN)
    .matches(/\d/, Messages.ONE_NUMBER)
    .matches(/[A-Z]/, Messages.ONE_UPPER)
    .required(Messages.REQUIRED),
  newPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], Messages.REPEAT_PASSWORD)
    .required(Messages.REQUIRED),
  repeatNewPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], Messages.REPEAT_PASSWORD)
    .required(Messages.REQUIRED),
}).required();

export type SettingsPasswordValues = Yup.InferType<typeof SettingsPasswordSchema>;
