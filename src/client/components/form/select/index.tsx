import * as React from "react";
import { FiChevronDown } from "react-icons/fi";
import { usePrevious, useClickAway } from "react-use";

import clsx from "clsx";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { Paper, FocusTrap } from "@/client/components/layout";

import { Control } from "../control";
import { IconButton } from "../icon-button";
import s from "./index.scss";

type Item = { label: string; value: string };

type SelectProps = Omit<React.ComponentProps<typeof Control>, "onChange" | "value"> & {
  readonly items: Item[];
  onChange: (item?: Item) => void;
  value: Item;
};

const variants: Variants = {
  initial: {
    y: -15,
    opacity: 0,
    transition: { ease: "easeInOut", duration: 0.125 },
  },
  exit: {
    y: -15,
    opacity: 0,
    transition: { ease: "easeInOut", duration: 0.125 },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { ease: "easeInOut", duration: 0.125 },
  },
};

export function Select({ items, value, onChange, ...props }: SelectProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const selectedRef = React.useRef<HTMLDivElement>(null);
  const arrowRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const previousIsOpen = usePrevious(isOpen);

  useClickAway(ref, () => {
    setIsOpen(false);
  });

  const onItemChange = React.useCallback(
    (item: Item) => {
      onChange(item);
      setIsOpen(false);
    },
    [onChange]
  );

  const onKeyPress = React.useCallback(
    (item: Item) => {
      return (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          onItemChange(item);
        } else {
          const els = ref.current?.querySelectorAll("div");

          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            let active;
            for (let i = 0; i < (els?.length ?? 0); i += 1) {
              if (els?.item(i) === window.document.activeElement) {
                if (i + 1 === els.length && e.key === "ArrowDown") {
                  active = els.item(0);
                } else if (i === 0 && e.key === "ArrowUp") {
                  active = els.item(els.length - 1);
                } else {
                  active = els.item(i + (e.key === "ArrowUp" ? -1 : 1));
                }
              }
            }

            if (active) {
              active.focus();
            }
          }

          if (/[A-Za-z]/.test(e.key) && e.key.length === 1) {
            let finded;
            for (let i = 0; i < (els?.length ?? 0); i += 1) {
              const el = els?.item(i);

              if (el?.textContent?.toLowerCase()?.startsWith(e.key.toLowerCase())) {
                finded = el;
              }
            }

            if (finded) {
              finded.focus();
            }
          }
        }
      };
    },
    [onItemChange, ref]
  );

  React.useEffect(() => {
    if (!isOpen && previousIsOpen && arrowRef.current) {
      arrowRef.current.focus();
    }

    if (isOpen && !previousIsOpen && selectedRef.current) {
      selectedRef.current.focus();
    }
  }, [isOpen, previousIsOpen]);

  return (
    <>
      <Control
        readOnly
        className={s.control}
        value={value?.label ?? ""}
        onFocus={() => setIsOpen(true)}
        append={
          <IconButton ref={arrowRef} tabIndex={0} onClick={() => setIsOpen(true)}>
            <FiChevronDown />
          </IconButton>
        }
        {...props}
      />
      <AnimatePresence exitBeforeEnter initial={false}>
        {isOpen && (
          <motion.div animate="animate" initial="initial" exit="exit" variants={variants} className={s.select}>
            <FocusTrap nodeRef={ref}>
              <Paper ref={ref} className={s.content}>
                {items.map((item) => (
                  <div
                    ref={item.value === value?.value ? selectedRef : undefined}
                    role="button"
                    tabIndex={0}
                    className={clsx(s.item, item.value === value?.value && s.active)}
                    onClick={() => onItemChange(item)}
                    onKeyDown={onKeyPress(item)}
                    key={item.value}
                  >
                    {item.label}
                  </div>
                ))}
              </Paper>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
