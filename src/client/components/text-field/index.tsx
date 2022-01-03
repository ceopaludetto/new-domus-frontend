import { useFormContext, get } from "react-hook-form";

import { TextField as MuiTextField, FilledTextFieldProps } from "@mui/material";

interface TextFieldProps extends Omit<FilledTextFieldProps, "variant"> {
  name: string;
}

export function TextField({ name, helperText, ...rest }: TextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name);

  const field = register(name);

  return <MuiTextField {...field} error={!!error} helperText={error?.message ?? helperText} {...rest} />;
}
