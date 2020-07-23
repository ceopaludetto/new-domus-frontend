import * as React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { CSSTransition } from "react-transition-group";

import clsx from "clsx";
import { useSelect } from "downshift";

import { Paper } from "@/client/components/layout";

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
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getItemProps,
    getToggleButtonProps,
    getMenuProps,
    getLabelProps,
    toggleMenu,
  } = useSelect({
    items,
    itemToString: (i) => i?.label ?? "",
    onSelectedItemChange: (i) => onChange(i.selectedItem?.value),
    selectedItem: items.find((i) => i.value === value) ?? null,
    id,
  });

  return (
    <>
      <Control
        readOnly
        className={s.control}
        value={selectedItem?.label ?? ""}
        append={
          <IconButton {...getToggleButtonProps({ ref: buttonRef })}>
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </IconButton>
        }
        onFocus={() => {
          toggleMenu();
          if (buttonRef.current) {
            buttonRef.current.focus();
          }
        }}
        labelProps={getLabelProps()}
        {...props}
      />
      <div {...getMenuProps()} className={s.select}>
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
          nodeRef={ref}
          unmountOnExit
        >
          <Paper ref={ref} className={s.content}>
            <div className={s.scroll}>
              {items.map((item, index) => (
                <div
                  className={clsx(s.item, highlightedIndex === index && s.active)}
                  key={item.value}
                  {...getItemProps({ item, index })}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </Paper>
        </CSSTransition>
      </div>
    </>
  );
}
