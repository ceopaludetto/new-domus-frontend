import React from "react";

import { css } from "@emotion/core";

import { dynamic, is } from "@/client/styles/acessors";
import { Theme, Colors } from "@/client/utils/common.dto";

export interface ControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: keyof Colors;
  margin?: boolean;
}

export function Control({ id, label, color = "primary", placeholder = " ", margin = true, ...rest }: ControlProps) {
  return (
    <div
      css={(theme: Theme) => css`
        ${is(
          margin,
          css`
            margin-bottom: ${theme.layout.sizes[4]};
          `
        )}
      `}
    >
      <div
        css={(theme: Theme) => css`
          display: flex;
          align-items: center;
          position: relative;
          width: 100%;
          border-radius: ${theme.shape};
          transition: ${theme.transitions.create(["background-color"])};
          background-color: ${theme.palette.background.darken[1]};
          overflow: hidden;
          ${dynamic(
            theme,
            color,
            ({ main }) => css`
              &:focus-within {
                background-color: ${theme.palette.background.darken[0]};
                label {
                  top: calc(${theme.layout.sizes[3]} + 2px);
                  font-size: ${theme.typography.sizes[0]};
                  color: ${main};
                }
                div {
                  &::before,
                  &::after {
                    width: 50%;
                    opacity: 1;
                  }
                  &::before {
                    left: 0%;
                  }
                }
              }
            `
          )};
        `}
      >
        <input
          css={(theme: Theme) => css`
            padding: ${theme.layout.sizes[6]} ${theme.layout.sizes[3]} ${theme.layout.sizes[3]};
            color: ${theme.palette.background.contrast};
            flex: 1;
            border: none;
            background-color: transparent;
            line-height: ${theme.layout.sizes[4]};
            &:not(:placeholder-shown) + label {
              font-size: ${theme.typography.sizes[0]};
              top: calc(${theme.layout.sizes[3]} + 2px);
            }
            &:focus {
              outline: none;
            }
          `}
          id={id}
          placeholder={placeholder}
          {...rest}
        />
        <label
          css={(theme: Theme) => css`
            font-size: ${theme.typography.sizes[1]};
            color: ${theme.palette.muted.main};
            font-weight: ${theme.typography.weights.medium};
            left: ${theme.layout.sizes[3]};
            transition: ${theme.transitions.create(["top", "color", "font-size"])};
            top: 50%;
            transform: translateY(-50%);
            display: inline-block;
            position: absolute;
            pointer-events: none;
          `}
          htmlFor={id}
        >
          {label}
        </label>
        <div
          css={(theme: Theme) => css`
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 100%;
            ${dynamic(
              theme,
              color,
              ({ main }) => css`
                &::before,
                &::after {
                  content: "";
                  display: block;
                  position: absolute;
                  height: 100%;
                  background-color: ${main};
                  left: 50%;
                  width: 0;
                  opacity: 0;
                  transition: ${theme.transitions.create(["width", "left", "opacity"])};
                }
              `
            )}
          `}
        />
      </div>
    </div>
  );
}
