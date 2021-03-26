import { useFormContext, get } from "react-hook-form";

import { Upload } from "@/client/components/form";

interface FormUploadProps extends React.ComponentProps<typeof Upload> {
  name: string;
}

export function FormUpload({ name, ...rest }: FormUploadProps) {
  const { register, errors } = useFormContext();
  const error = get(errors, name);

  return <Upload name={name} ref={register} error={!!error} {...rest} />;
}
