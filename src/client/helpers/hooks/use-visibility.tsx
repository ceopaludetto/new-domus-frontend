import { useCallback, useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import { IconButton, InputAdornment, TextFieldProps } from "@material-ui/core";

import { Tooltip } from "@/client/components";

type InputProps = TextFieldProps["InputProps"];

export function useVisibility(initialState = false) {
  const [showPassword, setShow] = useState(initialState);

  const render = useCallback(
    (props?: InputProps) => ({
      type: showPassword ? "text" : "password",
      InputProps: {
        ...props,
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={showPassword ? "Esconder senha" : "Mostrar senha"}>
              <IconButton
                color="primary"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                onClick={() => setShow((current) => !current)}
              >
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      },
    }),
    [showPassword]
  );

  return [render, showPassword] as const;
}

export function useMultipleVisibility<T extends string>(names: T[], initialValue = false) {
  const [isVisible, setIsVisible] = useState<{ [P in T]?: boolean }>(() => {
    const initialState = Object.fromEntries(names.map((n: T) => [n, initialValue] as const)) as { [P in T]?: boolean };

    return initialState;
  });

  const toggleVisible = useCallback(
    (name: T) => () => {
      setIsVisible((state) => ({ ...state, [name]: !state[name] }));
    },
    [setIsVisible]
  );

  const render = useCallback(
    (name: T, props?: InputProps) => ({
      type: isVisible[name] ? "text" : "password",
      InputProps: {
        ...props,
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={isVisible[name] ? "Esconder senha" : "Mostrar senha"}>
              <IconButton
                color="primary"
                aria-label={isVisible[name] ? "Esconder senha" : "Mostrar senha"}
                onClick={toggleVisible(name)}
              >
                {isVisible[name] ? <RiEyeOffLine /> : <RiEyeLine />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      },
    }),
    [isVisible, toggleVisible]
  );

  return [render, isVisible] as const;
}
