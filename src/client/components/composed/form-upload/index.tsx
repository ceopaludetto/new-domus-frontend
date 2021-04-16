import type { ComponentProps } from "react";
import { useFormContext, get } from "react-hook-form";

import { Upload } from "@/client/components/form";

interface FormUploadProps extends ComponentProps<typeof Upload> {
  name: string;
}

export function FormUpload({ name, ...rest }: FormUploadProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name);

  return <Upload {...register(name)} error={!!error} {...rest} />;
}
