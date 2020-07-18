/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from "react";
import { CSSTransition } from "react-transition-group";
import { useKeyPressEvent, useClickAway } from "react-use";

import clsx from "clsx";

import { FocusTrap } from "../focus-trap";
import { NoSsr } from "../no-ssr";
import s from "./index.scss";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

export function Modal({ open, onClose, children, className, ...props }: ModalProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);
  function handleKeyPress(key: string) {
    if (key === "Escape") {
      onClose();
    }
  }
  useKeyPressEvent("Escape", (e) => handleKeyPress(e.key));

  useClickAway(divRef, onClose);

  return (
    <NoSsr>
      <CSSTransition
        in={open}
        classNames={{
          enter: s.enter,
          enterActive: s["enter-active"],
          exit: s.exit,
          exitActive: s["exit-active"],
        }}
        timeout={125}
        unmountOnExit
        nodeRef={ref}
      >
        <FocusTrap nodeRef={ref}>
          <div ref={ref} className={s.modal} {...props}>
            <div ref={divRef} className={clsx(s.content, className)}>
              {children}
            </div>
          </div>
        </FocusTrap>
      </CSSTransition>
    </NoSsr>
  );
}
