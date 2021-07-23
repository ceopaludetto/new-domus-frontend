import type { ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@material-ui/core";

import { submitDisabled } from "@/client/utils/form";

type SubmitButtonProps = Omit<ComponentPropsWithoutRef<typeof Button>, "type">;

export function SubmitButton({ children, disabled, ...rest }: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <Button type="submit" disabled={disabled ?? submitDisabled(form)} {...rest}>
      {children}
    </Button>
  );
}
