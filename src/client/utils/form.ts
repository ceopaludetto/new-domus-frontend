import type { UseFormReturn } from "react-hook-form";

export function submitDisabled<T>(methods: UseFormReturn<T>) {
  const { isSubmitting, dirtyFields } = methods.formState;

  console.log(dirtyFields);

  return isSubmitting || !Object.keys(dirtyFields).length;
}
