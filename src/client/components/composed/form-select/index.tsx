import * as React from "react";
import { useFormContext, Controller, get } from "react-hook-form";

import { Select } from "@/client/components/form";

type FormSelect = Omit<React.ComponentProps<typeof Select>, "name" | "onChange" | "value"> & { name: string };

export function FormSelect({ name, items, helperText, defaultValue = "", ...rest }: FormSelect) {
  const { control, errors } = useFormContext();
  const error = get(errors, name);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ value, onChange }) => (
        <Select
          items={items}
          error={!!error}
          helperText={error?.message ?? helperText}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
    />
  );
}
