import React from "react";

import { css } from "@emotion/core";

import { traverse, dynamic, is } from "@/client/styles/acessors";
import { Colors, Theme } from "@/client/utils/common.dto";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  variant?: "contained" | "flat";
  color?: keyof Colors;
}

export function Button({ children, variant = "contained", color = "primary", block = false, ...rest }: ButtonProps) {
  return (
    <button
      css={(theme: Theme) => css`
        cursor: pointer;
        border: none;
        text-transform: uppercase;
        letter-spacing: 1.15px;
        min-width: ${theme.layout.sizes[11]};
        padding: ${theme.layout.sizes[3]} ${theme.layout.sizes[4]};
        border-radius: ${theme.shape};
        font-weight: ${theme.typography.weights.medium};
        transition: ${theme.transitions.create(["background-color"])};
        position: relative;
        &:focus {
          outline: none;
        }
        ${is(
          block,
          css`
            width: 100%;
          `
        )};
        ${traverse(variant, {
          contained: dynamic(
            theme,
            color,
            ({ main, contrast, darken }) => css`
              background-color: ${main};
              color: ${contrast};
              &:hover {
                background-color: ${darken[0]};
              }
              &:active,
              &:focus {
                background-color: ${darken[1]};
              }
            `
          ),
          flat: dynamic(
            theme,
            color,
            ({ main, shadows }) => css`
              background-color: transparent;
              color: ${main};
              &:hover {
                background-color: ${shadows[0]};
              }
              &:active,
              &:focus {
                background-color: ${shadows[1]};
              }
            `
          )
        })}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
