import * as React from "react";
import { FiCalendar } from "react-icons/fi";

import { format } from "date-fns";

import { Calendar } from "../calendar";
import { Control } from "../control";
import { IconButton } from "../icon-button";

type CalendarControlProps = Omit<React.ComponentPropsWithRef<typeof Control>, "value"> &
  React.ComponentProps<typeof Calendar>;

export const CalendarControl = React.forwardRef(
  (
    { name, value, onFocus, disablePast, disableFuture, ...props }: CalendarControlProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [selectedDate, setSelectedDate] = React.useState(value ?? new Date());
    const [open, setOpen] = React.useState(false);

    function handleOpen() {
      setOpen(true);
    }

    return (
      <>
        <Calendar
          value={selectedDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          onChange={(date) => setSelectedDate(date)}
          onClose={() => setOpen(false)}
        />
        <Control
          readOnly
          ref={ref}
          name={name}
          value={format(selectedDate, "dd/MM/yyyy")}
          onFocus={(e) => {
            handleOpen();
            if (onFocus) {
              onFocus(e);
            }
          }}
          append={
            <IconButton type="button" tabIndex={-1} onClick={handleOpen}>
              <FiCalendar />
            </IconButton>
          }
          {...props}
        />
      </>
    );
  }
);
