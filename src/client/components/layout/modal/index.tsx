/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from "react";
import { useKeyPressEvent, useClickAway } from "react-use";

import { motion, AnimatePresence, Variants, HTMLMotionProps } from "framer-motion";

import { FocusTrap } from "../focus-trap";
import { NoSsr } from "../no-ssr";
import s from "./index.scss";

interface ModalProps extends HTMLMotionProps<"div"> {
  open: boolean;
  onClose: () => void;
}

const variants: Variants = {
  initial: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
  animate: {
    opacity: 1,
    transition: { ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
};

const inner: Variants = {
  initial: {
    opacity: 0,
    y: -15,
    transition: { ease: "easeInOut" },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { ease: "easeInOut" },
  },
};

export function Modal({ open, onClose, children, className, ...props }: ModalProps) {
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
      <AnimatePresence exitBeforeEnter initial={false}>
        {open && (
          <motion.div
            variants={variants}
            animate="animate"
            initial="initial"
            exit="exit"
            className={s.modal}
            {...props}
          >
            <FocusTrap nodeRef={divRef}>
              <motion.div
                variants={inner}
                animate="animate"
                initial="initial"
                exit="exit"
                ref={divRef}
                className={className}
              >
                {children}
              </motion.div>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>
    </NoSsr>
  );
}
