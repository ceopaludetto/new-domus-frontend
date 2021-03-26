import * as Yup from "yup";

import * as Messages from "../constants";

import "../customs";

export const CondominiumSchema = Yup.object({
  id: Yup.string(),
  companyName: Yup.string().required(Messages.REQUIRED),
  character: Yup.string().max(1).required(Messages.REQUIRED),
  cnpj: Yup.string().cnpj().required(Messages.REQUIRED),
  rules: Yup.array(Yup.object({ id: Yup.string(), description: Yup.string().required(Messages.REQUIRED) })),
}).required();

export type CondominiumValues = Yup.InferType<typeof CondominiumSchema>;
