import * as Yup from "yup";

import * as Messages from "../constants";

export const SignInSchema = Yup.object({
  login: Yup.string().required(Messages.REQUIRED),
  password: Yup.string().required(Messages.REQUIRED),
}).required();

export type SignInValues = Yup.InferType<typeof SignInSchema>;
