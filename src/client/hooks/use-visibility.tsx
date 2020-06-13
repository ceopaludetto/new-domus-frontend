import * as React from "react";

import { OutlineVisibility, OutlineVisibilityOff } from "mdi-norm";

import { IconButton, Control } from "@/client/components";

type FieldProps = Pick<React.ComponentProps<typeof Control>, "type" | "append">;

export function useVisibility(initialValue?: boolean) {
  const [isVisible, setIsVisible] = React.useState(initialValue ?? false);

  const toggleVisible = React.useCallback(() => {
    setIsVisible((state) => !state);
  }, [setIsVisible]);

  const getFieldProps = React.useCallback((): FieldProps => {
    return {
      type: isVisible ? "text" : "password",
      append: (
        <IconButton tabIndex={-1} aria-label={isVisible ? "Esconder senha" : "Mostrar senha"} onClick={toggleVisible}>
          {isVisible ? <OutlineVisibilityOff /> : <OutlineVisibility />}
        </IconButton>
      ),
    };
  }, [isVisible, toggleVisible]);

  return [getFieldProps];
}

export function useMultipleVisibility<T extends string | symbol>(names: T[], initialValue?: boolean) {
  const [isVisible, setIsVisible] = React.useState<{ [P in T]?: boolean }>(() => {
    const initialState: { [P in T]?: boolean } = {};

    names.forEach((n: T) => {
      initialState[n] = initialValue ?? false;
    });

    return initialState;
  });

  const toggleVisible = React.useCallback(
    (name: T) => () => {
      setIsVisible((state) => ({ ...state, [name]: !state[name] }));
    },
    [setIsVisible]
  );

  const getFieldProps = React.useCallback(
    (name: T): FieldProps => {
      return {
        type: isVisible[name] ? "text" : "password",
        append: (
          <IconButton
            tabIndex={-1}
            aria-label={isVisible[name] ? "Esconder senha" : "Mostrar senha"}
            onClick={toggleVisible(name)}
          >
            {isVisible[name] ? <OutlineVisibilityOff /> : <OutlineVisibility />}
          </IconButton>
        ),
      };
    },
    [isVisible, toggleVisible]
  );

  return [getFieldProps];
}
