import * as React from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import { IconButton, TextFieldProps, InputAdornment } from "@material-ui/core";

import { Tooltip } from "@/client/components";

type FieldProps = Pick<TextFieldProps, "type" | "InputProps">;

export function useVisibility(initialValue?: boolean) {
  const [isVisible, setIsVisible] = React.useState(initialValue ?? false);

  const toggleVisible = React.useCallback(() => {
    setIsVisible((state) => !state);
  }, [setIsVisible]);

  const getFieldProps = React.useCallback(
    (props?: TextFieldProps["InputProps"]): FieldProps => {
      return {
        type: isVisible ? "text" : "password",
        InputProps: {
          ...props,
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={isVisible ? "Esconder senha" : "Mostrar senha"}>
                <IconButton
                  tabIndex={-1}
                  color="primary"
                  aria-label={isVisible ? "Esconder senha" : "Mostrar senha"}
                  onClick={toggleVisible}
                >
                  {isVisible ? <RiEyeOffLine /> : <RiEyeLine />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        },
      };
    },
    [isVisible, toggleVisible]
  );

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
    (name: T, props?: TextFieldProps["InputProps"]): FieldProps => {
      return {
        type: isVisible[name] ? "text" : "password",
        InputProps: {
          ...props,
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={isVisible[name] ? "Esconder senha" : "Mostrar senha"}>
                <IconButton
                  tabIndex={-1}
                  color="primary"
                  aria-label={isVisible[name] ? "Esconder senha" : "Mostrar senha como texto sem formatação"}
                  onClick={toggleVisible(name)}
                >
                  {isVisible[name] ? <RiEyeOffLine /> : <RiEyeLine />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        },
      };
    },
    [isVisible, toggleVisible]
  );

  return [getFieldProps];
}
