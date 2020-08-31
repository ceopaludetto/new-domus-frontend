import * as React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import clsx from "clsx";
import dayjs from "dayjs";

import { Paper, Divider } from "@/client/components/layout";
import { Text } from "@/client/components/typography";
import { useLocale } from "@/client/hooks";
import u from "@/client/styles/utils.scss";

import { Button } from "../button";
import { IconButton } from "../icon-button";
import s from "./index.scss";

interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  isOpen: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  value: Date;
  maxDate?: Date;
  minDate?: Date;
  onChange: (date: Date) => void;
  onClose?: () => void;
  animate?: boolean;
}

export default function Calendar({
  id,
  value,
  isOpen = false,
  disableFuture,
  disablePast,
  maxDate,
  minDate,
  onChange,
  onClose,
  animate = false,
}: CalendarProps) {
  const locale = useLocale();
  const today = React.useMemo(() => new Date(), []);
  const selectedRef = React.useRef<HTMLButtonElement>(null);
  const [currentDate, setCurrentDate] = React.useState(dayjs(value).locale(locale));
  const [daysOfWeek, setDaysOfWeek] = React.useState<dayjs.Dayjs[]>([]);
  const [yearMode, setYearMode] = React.useState(false);
  const selectedYear = React.useMemo(() => dayjs(value).locale(locale).get("year"), [value, locale]);
  const currentYearRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (isOpen && selectedRef.current !== document.activeElement) {
      setImmediate(() => {
        selectedRef?.current?.focus();
      });
    }
  }, [isOpen]);

  React.useEffect(() => {
    const now = dayjs().locale(locale);
    const day = now.startOf("week");
    const days: dayjs.Dayjs[] = [];

    for (let i = 0; i <= 6; i += 1) {
      days.push(day.add(i, "day"));
    }

    setDaysOfWeek(days);
  }, [locale]);

  React.useEffect(() => {
    if (yearMode && currentYearRef && currentYearRef.current) {
      currentYearRef.current.scrollIntoView({
        behavior: animate ? "smooth" : "auto",
        block: "center",
      });
    }
  }, [currentYearRef, yearMode, animate]);

  const resolveDisabled = React.useCallback(
    (date: dayjs.Dayjs) => {
      if (currentDate.isSame(date, "day")) {
        return false;
      }

      if (maxDate && date.isAfter(maxDate)) {
        return true;
      }

      if (minDate && date.isBefore(minDate)) {
        return true;
      }

      if (disableFuture && date.isAfter(today)) {
        return true;
      }

      if (disablePast && date.isBefore(today)) {
        return true;
      }

      return false;
    },
    [currentDate, disableFuture, disablePast, maxDate, minDate, today]
  );

  const handleKeyDown = React.useCallback(
    (date: dayjs.Dayjs) => {
      return (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
          const v = date.subtract(1, "day");
          onChange(v.toDate());
          setCurrentDate(v);
        }

        if (e.key === "ArrowRight") {
          const v = date.add(1, "day");
          onChange(v.toDate());
          setCurrentDate(v);
        }

        if (e.key === "ArrowUp") {
          const v = date.subtract(7, "day");
          onChange(v.toDate());
          setCurrentDate(v);
        }

        if (e.key === "ArrowDown") {
          const v = date.add(7, "day");
          onChange(v.toDate());
          setCurrentDate(v);
        }
      };
    },
    [onChange]
  );

  React.useEffect(() => {
    if (selectedRef.current && document.activeElement !== selectedRef.current) {
      selectedRef.current.focus();
    }
  }, [selectedRef, value]);

  const daysOfMonth = React.useCallback(() => {
    const monthStart = currentDate.startOf("month");
    const monthWeekStart = monthStart.startOf("week");
    const days: JSX.Element[] = [];

    let i = 0;

    while (i < 42) {
      const actual = monthWeekStart.add(i, "day");
      if (!actual.isSame(currentDate, "month")) {
        days.push(<div key={i} className={clsx(u["xs-1"], u["my-xs-1"], s.min)} />);
      } else {
        const selected = actual.isSame(value, "day");

        days.push(
          <div key={i} className={clsx(u["xs-1"], u["text-align-xs-center"], u["my-xs-1"], s.min)}>
            <Button
              ref={selected ? selectedRef : undefined}
              disabled={resolveDisabled(actual)}
              onClick={() => onChange(actual.toDate())}
              onKeyDown={handleKeyDown(actual)}
              tabIndex={selected ? 0 : -1}
              color={selected ? "primary" : "text"}
              className={s.button}
              variant="flat"
              size="small"
            >
              {actual.get("date")}
            </Button>
          </div>
        );
      }

      i += 1;
    }

    return days;
  }, [currentDate, value, resolveDisabled, onChange, handleKeyDown]);

  const getNextMonthFirstDay = React.useCallback((date: dayjs.Dayjs) => {
    return date.add(1, "month").startOf("month");
  }, []);

  const getPrevMonthLastDay = React.useCallback((date: dayjs.Dayjs) => {
    return date.subtract(1, "month").endOf("month");
  }, []);

  const years = React.useCallback(() => {
    const y: JSX.Element[] = [];

    for (let i = 1899; i <= 2099; i += 1) {
      const actual = dayjs(value).locale(locale).set("year", i);
      const selected = selectedYear === i;

      y.push(
        <div key={i} className={clsx(u["xs-1"], u["text-align-xs-center"], u["my-xs-1"])}>
          <Button
            ref={selected ? currentYearRef : undefined}
            size="small"
            disabled={resolveDisabled(actual) && !actual.isSame(today, "year")}
            onClick={() => {
              if (actual.isSame(today, "year") && resolveDisabled(actual)) {
                const max = dayjs(today).locale(locale).set("year", i);
                onChange(max.toDate());
                setCurrentDate(max);
              } else {
                onChange(actual.toDate());
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
  }, [value, onChange, resolveDisabled, selectedYear, today, locale]);

  return (
    <Paper>
      <div className={u["w-100"]}>
        <Button color={yearMode ? "text" : "muted"} onClick={() => setYearMode(true)} size="small" variant="flat">
          {selectedYear}
        </Button>
      </div>
      <div className={clsx(u["w-100"], u["mt-xs-2"])}>
        <Button color={yearMode ? "muted" : "text"} onClick={() => setYearMode(false)} size="small" variant="flat">
          {dayjs(value).locale(locale).format("dddd, DD [de] MMMM")}
        </Button>
      </div>
      <Divider />
      {!yearMode && (
        <>
          <div className={clsx(u.row, u["align-items-xs-center"], u["justify-content-xs-space-between"], u["mb-xs-3"])}>
            <div className={u.col}>
              <IconButton
                disabled={resolveDisabled(getPrevMonthLastDay(currentDate))}
                onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
                size="small"
                aria-label="Mês Anterior"
              >
                <FiArrowLeft />
              </IconButton>
            </div>
            <div className={u.col} id={`${id}-label`} aria-live="polite">
              {currentDate.format("MMMM")} - {currentDate.get("year")}
            </div>
            <div className={u.col}>
              <IconButton
                disabled={resolveDisabled(getNextMonthFirstDay(currentDate))}
                onClick={() => setCurrentDate(currentDate.add(1, "month"))}
                size="small"
                aria-label="Próximo Mês"
              >
                <FiArrowRight />
              </IconButton>
            </div>
          </div>
          <div className={clsx(u.grid, s.calendar)}>
            {daysOfWeek.map((d) => (
              <div key={d.toString()} className={clsx(u["xs-1"], u["text-align-xs-center"], u["mb-xs-3"])}>
                <Text as="span" abbr={d.format("dddd")} variant="body-2" color="muted">
                  {d.format("ddd")}
                </Text>
              </div>
            ))}
          </div>
          <div role="grid" aria-labelledby={`${id}-label`} className={clsx(u.grid, s.calendar)}>
            {daysOfMonth()}
          </div>
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
