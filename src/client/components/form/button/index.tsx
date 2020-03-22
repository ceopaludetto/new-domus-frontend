import React from "react";

import { css } from "@emotion/core";
import { useTheme } from "emotion-theming";

import { traverse } from "@/client/styles/acessors";
import { Colors, Theme } from "@/client/utils/common.dto";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  variant?: "contained" | "flat";
  color?: keyof Colors;
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
        cursor: pointer;
        border: none;
        text-transform: uppercase;
        letter-spacing: 1.15px;
        padding: 0.65rem 1.1rem;
        border-radius: ${theme.shape};
        font-weight: ${theme.typography.weights.medium};
        transition: ${theme.transitions.create(["background-color", "box-shadow"])};
        &:focus {
          outline: none;
        }
        ${block &&
          css`
            width: 100%;
          `};
        ${traverse(variant, {
          contained: css`
            background-color: ${theme.palette[color].main};
            color: ${theme.palette[color].contrast};
            &:hover {
              background-color: ${theme.palette[color].darken[0]};
            }
            &:active,
            &:focus {
              box-shadow: 0 0 0 3px ${theme.palette[color].shadows[2]};
              background-color: ${theme.palette[color].darken[1]};
            }
          `,
          flat: css`
            background-color: transparent;
            color: ${theme.palette[color].main};
            &:hover {
              background-color: ${theme.palette[color].shadows[0]};
            }
            &:active,
            &:focus {
              background-color: ${theme.palette[color].shadows[1]};
            }
          `
        })}
      `}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}
