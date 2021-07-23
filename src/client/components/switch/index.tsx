import type { ComponentPropsWithoutRef } from "react";
import { useController, useFormContext } from "react-hook-form";

import { FormControl, FormControlLabel, FormLabel, Switch as MuiSwitch } from "@material-ui/core";

interface SwitchProps extends ComponentPropsWithoutRef<typeof MuiSwitch> {
  label?: string;
  name: string;
  content: string;
}

export function Switch({ name, label, content, ...rest }: SwitchProps) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  const { ref, ...form } = field;

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControlLabel label={content} control={<MuiSwitch inputRef={ref} {...form} {...rest} />} />
    </FormControl>
  );
}
