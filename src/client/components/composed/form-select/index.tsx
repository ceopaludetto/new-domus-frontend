import * as React from "react";
import { useFormContext, Controller, get } from "react-hook-form";

import { Select } from "@/client/components/form";

type FormSelect = React.ComponentProps<typeof Select> & { name: string };

export function FormSelect({ name, items, helperText, ...rest }: FormSelect) {
  const { control, errors } = useFormContext();
  const message = get(errors, `${name}.message`, helperText);

  return (
    <Controller
      control={control}
      name={name}
      render={({ value, onChange }) => (
        <Select items={items} error={!!errors[name]} helperText={message} value={value} onChange={onChange} {...rest} />
      )}
    />
  );
}
