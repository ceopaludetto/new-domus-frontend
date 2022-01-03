import { Yup } from "./yup";

export const LoginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export type LoginSchemaValues = Yup.InferType<typeof LoginSchema>;
