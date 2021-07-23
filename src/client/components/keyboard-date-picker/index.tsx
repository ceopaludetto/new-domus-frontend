import type { ComponentPropsWithoutRef } from "react";
import { get, useController } from "react-hook-form";
import { FiCalendar } from "react-icons/fi";

import { KeyboardDatePicker as MuiKeyboardDatePicker } from "@material-ui/pickers";

interface KeyboardDatePickerProps
  extends Omit<ComponentPropsWithoutRef<typeof MuiKeyboardDatePicker>, "value" | "onChange"> {
  id: string;
  name: string;
}

export function KeyboardDatePicker({
  name,
  defaultValue = new Date(),
  keyboardIcon = <FiCalendar />,
  helperText,
  ...rest
}: KeyboardDatePickerProps) {
  const {
    field,
    formState: { errors },
  } = useController({ name, defaultValue });
  const error = get(errors, name);

  const { ref, ...form } = field;

  return (
    <MuiKeyboardDatePicker
      format="DD/MM/YYYY"
      inputRef={ref}
      error={!!error}
      helperText={error?.message ?? helperText}
      keyboardIcon={keyboardIcon}
      KeyboardButtonProps={{ color: "primary" }}
      okLabel="Selecionar"
      cancelLabel="Cancelar"
      {...form}
      {...rest}
    />
  );
}
