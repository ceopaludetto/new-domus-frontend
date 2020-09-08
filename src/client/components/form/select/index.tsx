import * as React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { usePopper } from "react-popper";
import { CSSTransition } from "react-transition-group";

import { useSelect } from "downshift";

import { Paper, MenuItem } from "@/client/components/layout";

import { Control } from "../control";
import { IconButton } from "../icon-button";
import s from "./index.module.scss";

type Item = { label: string; value: string };

type SelectProps = Omit<React.ComponentProps<typeof Control>, "onChange" | "value"> & {
  readonly items: Item[];
  onChange: (item?: Item["value"]) => void;
  value: Item["value"];
};

export function Select({ items, value, onChange, id, ...props }: SelectProps) {
  const [menu, setMenu] = React.useState<HTMLDivElement | null>(null);
  const [control, setControl] = React.useState<HTMLDivElement | null>(null);
  const transition = React.useRef<HTMLDivElement>(null);
  const button = React.useRef<HTMLButtonElement>(null);
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
  const { styles, attributes } = usePopper(control, menu);

  return (
    <>
      <Control
        readOnly
        containerRef={setControl}
        className={s.control}
        value={selectedItem?.label ?? ""}
        append={
          <IconButton {...getToggleButtonProps({ ref: button })}>
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </IconButton>
        }
        onFocus={() => {
          toggleMenu();
          if (button.current) {
            button.current.focus();
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
          nodeRef={transition}
          unmountOnExit
        >
          <div ref={setMenu} style={styles.popper} className={s.content} {...attributes.popper}>
            <Paper ref={transition} className={s.menu}>
              <div className={s.scroll}>
                {items.map((item, index) => (
                  <MenuItem key={item.value} active={highlightedIndex === index} {...getItemProps({ item, index })}>
                    {item.label}
                  </MenuItem>
                ))}
              </div>
            </Paper>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
