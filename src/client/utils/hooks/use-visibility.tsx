import { useCallback, useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import { IconButton, InputAdornment, InputProps, TextFieldProps } from "@mui/material";

import { Tooltip } from "@/client/components";

type VisibilityState<T extends string> = { [P in T]: boolean };

export function useVisibility<T extends string>(names: T[], initialValue = false) {
  const [visible, setVisible] = useState<VisibilityState<T>>(
    () => Object.fromEntries(names.map((name: T) => [name, initialValue])) as VisibilityState<T>
  );

  const toggleVisibility = useCallback((name: T) => {
    setVisible((current) => ({ ...current, [name]: !current[name] }));
  }, []);

  const mapToProps = useCallback(
    (name: T, props?: InputProps): TextFieldProps => ({
      type: visible[name] ? "text" : "password",
      InputProps: {
        ...props,
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={visible[name] ? "Esconder senha" : "Mostrar senha"}>
              <IconButton
                color="primary"
                aria-label={visible[name] ? "Esconder senha" : "Mostrar senha"}
                onClick={() => toggleVisibility(name)}
              >
                {visible[name] ? <RiEyeOffLine /> : <RiEyeLine />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      },
    }),
    [toggleVisibility, visible]
  );

  return [mapToProps, visible] as const;
}
