import * as React from "react";
import { Controller, useFormContext, get } from "react-hook-form";

import { CalendarControl } from "@/client/components/form";

type FormCalendarProps = Omit<
  React.ComponentProps<typeof CalendarControl>,
  "name" | "value" | "onChange" | "onBlur"
> & { name: string };

export function FormCalendar({ name, helperText, ...rest }: FormCalendarProps) {
  const { control, errors } = useFormContext();
  const error = get(errors, name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ value = new Date(), ...props }) => {
        return (
          <CalendarControl
            value={value}
            error={!!error}
            helperText={error?.message ?? helperText}
            {...props}
            {...rest}
          />
        );
      }}
    />
  );
}
