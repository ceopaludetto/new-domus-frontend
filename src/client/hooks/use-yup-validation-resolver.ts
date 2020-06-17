import * as React from "react";

import * as Yup from "yup";

export function useYupValidationResolver<T extends Yup.ObjectSchema<any>>(validationSchema: T) {
  const validationResolver = React.useCallback(
    async (data: Yup.InferType<T>) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: (errors as Yup.ValidationError).inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

  return validationResolver;
}
