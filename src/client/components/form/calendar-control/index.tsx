import * as React from "react";
import { FiCalendar } from "react-icons/fi";

import { format, parse, isValid, isEqual } from "date-fns";
import { Rifm } from "rifm";

import { Modal } from "@/client/components/layout";
import * as Masks from "@/client/helpers/masks";

import { Calendar } from "../calendar";
import { Control } from "../control";
import { IconButton } from "../icon-button";

type CalendarControlProps = Omit<React.ComponentPropsWithRef<typeof Control>, "value" | "onChange"> &
  React.ComponentProps<typeof Calendar>;

export const CalendarControl = React.forwardRef(
  (
    {
      name,
      disablePast,
      disableFuture,
      value: calendarValue,
      onChange: onCalendarChange,
      ...props
    }: CalendarControlProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [open, setOpen] = React.useState(false);
    const [controlValue, setControlValue] = React.useState(() => format(calendarValue, "dd/MM/yyyy"));

    function handleOpen() {
      setOpen(true);
    }

    function handleChange(str: string) {
      setControlValue(str);
    }

    React.useEffect(() => {
      if (controlValue.length >= 10) {
        const parsed = parse(controlValue, "dd/MM/yyyy", new Date());
        if (isValid(parsed) && !isEqual(calendarValue, parsed)) {
          onCalendarChange(parsed);
        }
      }
    }, [controlValue, onCalendarChange, calendarValue]);

    return (
      <>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Calendar
            value={calendarValue}
            disablePast={disablePast}
            disableFuture={disableFuture}
            onChange={(date) => {
              onCalendarChange(date);
              setControlValue(format(date, "dd/MM/yyyy"));
            }}
            onClose={() => setOpen(false)}
          />
        </Modal>
        <Rifm format={Masks.date} value={controlValue} onChange={handleChange}>
          {({ onChange, value }) => (
            <Control
              ref={ref}
              name={name}
              value={value}
              onChange={onChange}
              append={
                <IconButton type="button" tabIndex={-1} onClick={handleOpen}>
                  <FiCalendar />
                </IconButton>
              }
              {...props}
            />
          )}
        </Rifm>
      </>
    );
  }
);
