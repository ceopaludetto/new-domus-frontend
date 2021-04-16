/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback, useContext, createContext, ReactNode } from "react";
import type { UseFormSetError, SubmitHandler, UnpackNestedValue } from "react-hook-form";

import { retrieveErrorType } from "@/client/utils/error";

export function useErrorHandler() {
  const [defaultError, setDefaultError] = useState("");

  const handleError = useCallback(
    <T extends Record<string, any>>(handler: SubmitHandler<T>, setError: UseFormSetError<T>) => async (
      data: UnpackNestedValue<T>
    ) => {
      setDefaultError("");
      try {
        await handler(data);
      } catch (err) {
        const error = retrieveErrorType(err);
        if (error.type === "field") {
          setError(error.field as any, { message: error.message });
        } else {
          setDefaultError(error.message);
        }
      }
    },
    []
  );

  const emptyDefaultError = useCallback(() => setDefaultError(""), [setDefaultError]);

  return { defaultError, handleError, emptyDefaultError };
}

const ErrorHandlerContext = createContext<ReturnType<typeof useErrorHandler>>({
  defaultError: "",
  handleError: (handler) => async () => {},
  emptyDefaultError: () => {},
});

type ErrorHandlerProviderProps = {
  children: ReactNode;
} & ReturnType<typeof useErrorHandler>;

export function ErrorHandlerProvider({ children, ...rest }: ErrorHandlerProviderProps) {
  return <ErrorHandlerContext.Provider value={rest}>{children}</ErrorHandlerContext.Provider>;
}

export function useErrorHandlerContext() {
  return useContext(ErrorHandlerContext);
}
