import * as Yup from "yup";

import * as Messages from "../constants";

import "../customs";

export const BlockSchema = Yup.object({
  name: Yup.string().required(Messages.REQUIRED),
  number: Yup.number().typeError(Messages.NUMBER).required(Messages.REQUIRED),
  images: Yup.mixed<File[]>().file(),
}).required();

export type BlockValues = Yup.InferType<typeof BlockSchema>;
