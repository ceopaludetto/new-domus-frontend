import { useFormContext, get } from "react-hook-form";

import { TextField as MuiTextField } from "@material-ui/core";

interface TextFieldProps extends React.ComponentPropsWithoutRef<typeof MuiTextField> {
  name: string;
  id: string;
}

export function TextField({ name, helperText, ...rest }: TextFieldProps) {
  const { register, formState } = useFormContext();
  const error = get(formState.errors, name);

  const { ref, ...form } = register(name);

  return <MuiTextField inputRef={ref} error={!!error} helperText={error?.message ?? helperText} {...form} {...rest} />;
}
