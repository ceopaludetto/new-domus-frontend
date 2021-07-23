import * as Yup from "yup";

import * as Messages from "../constants";
import "../customs";

export const ResetSchema = Yup.object({
  password: Yup.string()
    .min(6, Messages.MIN)
    .matches(/\d/, Messages.ONE_NUMBER)
    .matches(/[A-Z]/, Messages.ONE_UPPER)
    .required(Messages.REQUIRED),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], Messages.REPEAT_PASSWORD)
    .required(Messages.REQUIRED),
}).required();

export type ResetValues = Yup.InferType<typeof ResetSchema>;
