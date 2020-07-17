import * as React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import clsx from "clsx";
import {
  getYear,
  getDay,
  getDaysInMonth,
  getDate,
  addDays,
  addMonths,
  subMonths,
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  isFuture,
  isPast,
  isAfter,
  isBefore,
} from "date-fns";

import { Paper, Divider } from "@/client/components/layout";
import { ColorText } from "@/client/components/typography";
import u from "@/client/styles/utils.scss";

import { Button } from "../button";
import { IconButton } from "../icon-button";
import s from "./index.scss";

interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  disablePast?: boolean;
  disableFuture?: boolean;
  value?: Date;
  maxDate?: Date;
  minDate?: Date;
  onChange?: (date: Date) => void;
  onClose?: () => void;
}

export function Calendar({ value, disableFuture, disablePast, maxDate, minDate, onChange, onClose }: CalendarProps) {
  const today = React.useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = React.useState(value ?? today);
  const [currentDate, setCurrentDate] = React.useState(selectedDate);
  const [daysOfWeek, setDaysOfWeek] = React.useState<string[]>([]);

  React.useEffect(() => {
    const day = startOfWeek(new Date());
    const days: string[] = [];

    for (let i = 0; i <= 6; i += 1) {
      days.push(format(addDays(day, i), "eee"));
    }

    setDaysOfWeek(days);
  }, []);

  const resolveDisabled = React.useCallback(
    (date: Date) => {
      if (isSameDay(currentDate, date)) {
        return false;
      }

      if (maxDate && isAfter(date, maxDate)) {
        return true;
      }

      if (minDate && isBefore(date, minDate)) {
        return true;
      }

      if (disableFuture && isFuture(date)) {
        return true;
      }

      if (disablePast && isPast(date)) {
        return true;
      }

      return false;
    },
    [currentDate, disableFuture, disablePast, maxDate, minDate]
  );

  const daysOfMonth = React.useCallback(() => {
    const monthStart = startOfMonth(currentDate);
    const monthWeekStart = startOfWeek(monthStart);
    const dayOfWeekMonthStart = getDay(monthStart);
    const daysInMonth = getDaysInMonth(currentDate);
    const days: JSX.Element[] = [];

    let i = 0;

    while (i < daysInMonth + dayOfWeekMonthStart) {
      const actual = addDays(monthWeekStart, i);
      if (!isSameMonth(actual, currentDate)) {
        days.push(<div key={i} className={clsx(u["xs-1"], u["my-xs-1"])} />);
      } else {
        days.push(
          <div key={i} className={clsx(u["xs-1"], u["text-align-xs-center"], u["my-xs-1"])}>
            <Button
              className={s.button}
              disabled={resolveDisabled(actual)}
              onClick={() => setSelectedDate(actual)}
              color={isSameDay(selectedDate, actual) ? "primary" : "text"}
              variant="flat"
              size="small"
            >
              {getDate(actual)}
            </Button>
          </div>
        );
      }

      i += 1;
    }

    return days;
  }, [currentDate, selectedDate, resolveDisabled]);

  const getNextMonthFirstDay = React.useCallback((date: Date) => {
    return startOfMonth(addMonths(date, 1));
  }, []);

  const getPrevMonthLastDay = React.useCallback((date: Date) => {
    return endOfMonth(subMonths(date, 1));
  }, []);

  return (
    <Paper>
      <div className={u["w-100"]}>
        <Button color="muted" size="small" variant="flat">
          {getYear(selectedDate)}
        </Button>
      </div>
      <div className={clsx(u["w-100"], u["mt-xs-2"])}>
        <Button color="text" size="small" variant="flat">
          {format(selectedDate, "eeee, dd 'de' MMMM")}
        </Button>
      </div>
      <Divider />
      <div className={clsx(u.row, u["align-items-xs-center"], u["justify-content-xs-space-between"], u["mb-xs-3"])}>
        <div className={u.col}>
          <IconButton
            disabled={resolveDisabled(getPrevMonthLastDay(currentDate))}
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            size="small"
          >
            <FiArrowLeft />
          </IconButton>
        </div>
        <div className={u.col}>{format(currentDate, "MMMM")}</div>
        <div className={u.col}>
          <IconButton
            disabled={resolveDisabled(getNextMonthFirstDay(currentDate))}
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            size="small"
          >
            <FiArrowRight />
          </IconButton>
        </div>
      </div>
      <div className={clsx(u.grid, s.calendar)}>
        {daysOfWeek.map((d) => (
          <div key={d} className={clsx(u["xs-1"], u["text-align-xs-center"], u["mb-xs-3"])}>
            <ColorText small color="muted">
              {d}
            </ColorText>
          </div>
        ))}
      </div>
      <div className={clsx(u.grid, s.calendar)}>{daysOfMonth()}</div>
      <div className={clsx(u["mt-xs-4"], u["text-align-xs-right"])}>
        <Button onClick={onClose} size="small" variant="flat">
          Voltar
        </Button>{" "}
        <Button
          onClick={() => {
            if (onChange) {
              onChange(selectedDate);
            }
            if (onClose) {
              onClose();
            }
          }}
          size="small"
          variant="contained"
        >
          Selecionar
        </Button>
      </div>
    </Paper>
  );
}
