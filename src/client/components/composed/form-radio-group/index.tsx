import { useFormContext, get, Controller } from "react-hook-form";

import { RadioGroup, RadioGroupProps, FormControl, FormHelperText, FormLabel } from "@material-ui/core";

interface FormRadioCardProps extends Omit<RadioGroupProps, "name" | "value" | "error" | "onChange"> {
  label?: string;
  helperText?: string;
  name: string;
}

export function FormRadioGroup({ name, label, defaultValue = "", helperText, children, ...rest }: FormRadioCardProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name);

  return (
    <FormControl fullWidth error={!error}>
      {label && <FormLabel>{label}</FormLabel>}
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup {...field} {...rest}>
            {children}
          </RadioGroup>
        )}
      />
      {(error?.message ?? helperText) && (
        <FormHelperText error={!!error}>{error?.message ?? helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
