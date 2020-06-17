import * as Yup from "yup";

import * as Messages from "../constants";

export const ForgotSchema = Yup.object({
  login: Yup.string().required(Messages.REQUIRED),
});

export type ForgotValues = Yup.InferType<typeof ForgotSchema>;
