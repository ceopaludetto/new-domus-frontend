import * as React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import clsx from "clsx";
import {
  getYear,
  getDate,
  addDays,
  addMonths,
  subMonths,
  setYear,
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
  isSameYear,
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
  value: Date;
  maxDate?: Date;
  minDate?: Date;
  onChange: (date: Date) => void;
  onClose?: () => void;
  animate?: boolean;
}

export function Calendar({
  value,
  disableFuture,
  disablePast,
  maxDate,
  minDate,
  onChange,
  onClose,
  animate = false,
}: CalendarProps) {
  const today = React.useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = React.useState(value);
  const [daysOfWeek, setDaysOfWeek] = React.useState<string[]>([]);
  const [yearMode, setYearMode] = React.useState(false);
  const selectedYear = React.useMemo(() => getYear(value), [value]);
  const currentYearRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const day = startOfWeek(new Date());
    const days: string[] = [];

    for (let i = 0; i <= 6; i += 1) {
      days.push(format(addDays(day, i), "eee"));
    }

    setDaysOfWeek(days);
  }, []);

  React.useEffect(() => {
    if (yearMode && currentYearRef && currentYearRef.current) {
      currentYearRef.current.scrollIntoView({
        behavior: animate ? "smooth" : "auto",
        block: "center",
      });
    }
  }, [currentYearRef, yearMode, animate]);

  const changeDate = React.useCallback(
    (date: Date) => {
      onChange(date);
    },
    [onChange]
  );

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
    const days: JSX.Element[] = [];

    let i = 0;

    while (i < 42) {
      const actual = addDays(monthWeekStart, i);
      if (!isSameMonth(actual, currentDate)) {
        days.push(<div key={i} className={clsx(u["xs-1"], u["my-xs-1"], s.min)} />);
      } else {
        days.push(
          <div key={i} className={clsx(u["xs-1"], u["text-align-xs-center"], u["my-xs-1"], s.min)}>
            <Button
              className={s.button}
              disabled={resolveDisabled(actual)}
              onClick={() => changeDate(actual)}
              color={isSameDay(value, actual) ? "primary" : "text"}
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
  }, [currentDate, value, resolveDisabled, changeDate]);

  const getNextMonthFirstDay = React.useCallback((date: Date) => {
    return startOfMonth(addMonths(date, 1));
  }, []);

  const getPrevMonthLastDay = React.useCallback((date: Date) => {
    return endOfMonth(subMonths(date, 1));
  }, []);

  const years = React.useCallback(() => {
    const y: JSX.Element[] = [];

    for (let i = 1899; i <= 2099; i += 1) {
      const actual = setYear(value, i);
      const selected = selectedYear === i;

      y.push(
        <div key={i} className={clsx(u["xs-1"], u["text-align-xs-center"], u["my-xs-1"])}>
          <Button
            ref={selected ? currentYearRef : undefined}
            size="small"
            disabled={resolveDisabled(actual) && !isSameYear(today, actual)}
            onClick={() => {
              if (isSameYear(actual, today) && resolveDisabled(actual)) {
                const max = setYear(today, i);
                changeDate(max);
                setCurrentDate(max);
              } else {
                changeDate(actual);
                setCurrentDate(actual);
              }
              setYearMode(false);
            }}
            variant="flat"
            color={selected ? "primary" : "text"}
          >
            {i}
          </Button>
        </div>
      );
    }

    return y;
  }, [value, changeDate, resolveDisabled, selectedYear, today]);

  return (
    <Paper>
      <div className={u["w-100"]}>
        <Button color={yearMode ? "text" : "muted"} onClick={() => setYearMode(true)} size="small" variant="flat">
          {selectedYear}
        </Button>
      </div>
      <div className={clsx(u["w-100"], u["mt-xs-2"])}>
        <Button color={yearMode ? "muted" : "text"} onClick={() => setYearMode(false)} size="small" variant="flat">
          {format(value, "eeee, dd 'de' MMMM")}
        </Button>
      </div>
      <Divider />
      {!yearMode && (
        <>
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
            <div className={u.col}>
              {format(currentDate, "MMMM")} - {getYear(currentDate)}
            </div>
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
        </>
      )}
      {yearMode && <div className={clsx(s.years, u.grid, s.width)}>{years()}</div>}
      <div className={clsx(u["mt-xs-4"], u["text-align-xs-right"])}>
        <Button onClick={onClose} size="small" variant="flat">
          Finalizar
        </Button>
      </div>
    </Paper>
  );
}
