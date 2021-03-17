import type { UseFormMethods } from "react-hook-form";

export function submitDisabled<T>(methods: UseFormMethods<T>) {
  const { isSubmitting, dirtyFields } = methods.formState;

  return isSubmitting || !Object.keys(dirtyFields).length;
}
