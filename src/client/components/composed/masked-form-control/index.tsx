import * as React from "react";
import { useFormContext, Controller, get } from "react-hook-form";

import { Rifm } from "rifm";

import { Control } from "../../form";

interface MaskedFormControlProps extends Omit<React.ComponentProps<typeof Control>, "ref" | "name" | "error"> {
  name: string;
  rifm: Omit<React.ComponentProps<typeof Rifm>, "value" | "onChange" | "children">;
}

export function MaskedFormControl({ name, helperText, rifm, defaultValue, ...rest }: MaskedFormControlProps) {
  const { control, errors } = useFormContext();
  const error = get(errors, name);

  return (
    <Controller
      defaultValue={defaultValue}
      render={({ onBlur, ...props }) => (
        <Rifm {...props} {...rifm}>
          {({ onChange, value }) => (
            <Control
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              name={name}
              error={!!error}
              helperText={error?.message ?? helperText}
              {...rest}
            />
          )}
        </Rifm>
      )}
      control={control}
      name={name}
    />
  );
}
