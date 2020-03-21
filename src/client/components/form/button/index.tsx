import React from "react";

import { css } from "@emotion/core";
import { useTheme } from "emotion-theming";

import { Theme } from "@/client/providers/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  variant?: "contained" | "flat";
  color?: "primary" | "background";
}

export function Button({
  type = "button",
  children,
  variant = "contained",
  color = "primary",
  block = false,
  ...rest
}: ButtonProps) {
  const theme = useTheme<Theme>();

  return (
    <button
      css={css`
        border: none;
        text-transform: uppercase;
        letter-spacing: 1.15px;
        padding: 0.65rem 1.1rem;
        background-color: ${theme.palette[theme.palette.current].primary};
        ${block &&
          css`
            width: 100%;
          `};
      `}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}
