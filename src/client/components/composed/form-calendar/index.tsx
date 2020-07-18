import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { parseISO, isValid } from "date-fns";

import { CalendarControl } from "@/client/components/form";

type FormCalendarProps = Omit<
  React.ComponentProps<typeof CalendarControl>,
  "name" | "value" | "onChange" | "onBlur"
> & { name: string };

export function FormCalendar({ name, ...rest }: FormCalendarProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ value = new Date(), ...props }) => {
        let v!: Date;

        if (value) {
          if (value instanceof Date && isValid(value)) {
            v = value;
          } else {
            const parsed = parseISO(value);

            if (isValid(parsed)) {
              v = parsed;
            }
          }
        } else {
          v = new Date();
        }

        return <CalendarControl value={v} {...props} {...rest} />;
      }}
    />
  );
}
