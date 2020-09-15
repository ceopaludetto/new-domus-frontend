import * as Yup from "yup";

import * as Messages from "../constants";

import "../customs";

export const BlockSchema = Yup.object({
  name: Yup.string(),
  number: Yup.number().required(Messages.REQUIRED),
  image: Yup.mixed<FileList>().file(),
}).required();

export type BlockValues = Yup.InferType<typeof BlockSchema>;
