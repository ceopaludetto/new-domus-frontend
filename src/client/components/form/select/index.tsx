import * as React from "react";
import { FiChevronDown } from "react-icons/fi";
import { CSSTransition } from "react-transition-group";
import { useClickAway } from "react-use";

import clsx from "clsx";

import { Paper, FocusTrap } from "@/client/components/layout";

import { Control } from "../control";
import { IconButton } from "../icon-button";
import s from "./index.scss";

type Item = { label: string; value: string };

type SelectProps = Omit<React.ComponentProps<typeof Control>, "onChange" | "value"> & {
  readonly items: Item[];
  onChange: (item?: Item["value"]) => void;
  value: Item["value"];
};

export function Select({ items, value, onChange, id, ...props }: SelectProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);
  const selectedRef = React.useRef<HTMLDivElement>(null);
  const arrowRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const selected = React.useMemo(() => items.find((i) => i.value === value), [value, items]);

  useClickAway(ref, () => {
    setIsOpen(false);
  });

  const onItemChange = React.useCallback(
    (item: Item) => {
      onChange(item.value);
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
          const els = ref.current?.querySelectorAll('div[tabindex="0"]');

          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            let active!: HTMLElement;
            for (let i = 0; i < (els?.length ?? 0); i += 1) {
              if (els?.item(i) === window.document.activeElement) {
                if (i + 1 === els.length && e.key === "ArrowDown") {
                  active = els.item(0) as HTMLElement;
                } else if (i === 0 && e.key === "ArrowUp") {
                  active = els.item(els.length - 1) as HTMLElement;
                } else {
                  active = els.item(i + (e.key === "ArrowUp" ? -1 : 1)) as HTMLElement;
                }
              }
            }

            if (active) {
              active.focus();
            }
          }

          if (/[A-Za-z]/.test(e.key) && e.key.length === 1) {
            let finded!: HTMLElement;
            for (let i = 0; i < (els?.length ?? 0); i += 1) {
              const el = els?.item(i);

              if (el?.textContent?.toLowerCase()?.startsWith(e.key.toLowerCase())) {
                finded = el as HTMLElement;
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

  return (
    <>
      <Control
        readOnly
        className={s.control}
        value={selected?.label ?? ""}
        onFocus={() => setIsOpen(true)}
        append={
          <IconButton
            aria-describedby={`${id}-label ${id}-toggle-button`}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            id={`${id}-toggle-button`}
            ref={arrowRef}
            tabIndex={0}
            onClick={() => setIsOpen(true)}
          >
            <FiChevronDown />
          </IconButton>
        }
        labelProps={{
          id: `${id}-label`,
        }}
        {...props}
      />
      <CSSTransition
        in={isOpen}
        timeout={125}
        classNames={{
          enter: s.enter,
          enterActive: s["enter-active"],
          enterDone: s["enter-done"],
          exit: s.exit,
          exitActive: s["exit-active"],
          exitDone: s["exit-done"],
        }}
        nodeRef={divRef}
        onEntering={() => {
          if (selectedRef.current) {
            selectedRef.current.focus();
          }
        }}
        unmountOnExit
      >
        <div ref={divRef} className={s.select}>
          <FocusTrap nodeRef={ref}>
            <Paper
              tabIndex={-1}
              role="listbox"
              aria-describedby={`${id}-label`}
              aria-expanded={isOpen}
              ref={ref}
              className={s.content}
            >
              {items.map((item) => (
                <div
                  tabIndex={0}
                  role="option"
                  ref={item === selected ? selectedRef : undefined}
                  aria-selected={item === selected}
                  className={clsx(s.item, item.value === value && s.active)}
                  onClick={() => onItemChange(item)}
                  onKeyDown={onKeyPress(item)}
                  key={item.value}
                >
                  {item.label}
                </div>
              ))}
            </Paper>
          </FocusTrap>
        </div>
      </CSSTransition>
    </>
  );
}
