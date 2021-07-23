import { useCallback, useState } from "react";
import type { SubmitHandler, UseFormReturn, Path } from "react-hook-form";

import { retrieveErrorType } from "@/client/utils/error";

interface UseErrorHandlerProps<T> {
  mapFields: Record<string, Path<T>>;
}

export function useErrorHandler<T>(form: UseFormReturn<T>, options?: UseErrorHandlerProps<T>) {
  const { mapFields } = options ?? {};
  const [localError, setLocalError] = useState("");

  const handleSubmit = useCallback(
    (handler: SubmitHandler<T>) =>
      form.handleSubmit(async (values) => {
        try {
          await handler(values);
        } catch (err) {
          const error = retrieveErrorType(err);
          if (error.type === "field") {
            let field = error.field as Path<T>;

            if (mapFields?.[error.field]) {
              field = mapFields[error.field];
            }

            form.setError(field, { message: error.message });
          } else {
            setLocalError(error.message);
          }
        }
      }),
    [form, mapFields]
  );

  const handleClear = useCallback(() => {
    setLocalError("");
  }, []);

  return [handleSubmit, { localError, handleClear }] as const;
}
