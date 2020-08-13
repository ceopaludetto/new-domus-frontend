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
  value,
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
  const [currentDate, setCurrentDate] = React.useState(dayjs(value).locale(locale));
  const [daysOfWeek, setDaysOfWeek] = React.useState<string[]>([]);
  const [yearMode, setYearMode] = React.useState(false);
  const selectedYear = React.useMemo(() => dayjs(value).locale(locale).get("year"), [value, locale]);
  const currentYearRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const now = dayjs().locale(locale);
    const day = now.startOf("week");
    const days: string[] = [];

    for (let i = 0; i <= 6; i += 1) {
      days.push(day.add(i, "day").format("ddd"));
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

  const changeDate = React.useCallback(
    (date: dayjs.Dayjs) => {
      onChange(date.toDate());
    },
    [onChange]
  );

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
        days.push(
          <div key={i} className={clsx(u["xs-1"], u["text-align-xs-center"], u["my-xs-1"], s.min)}>
            <Button
              className={s.button}
              disabled={resolveDisabled(actual)}
              onClick={() => changeDate(actual)}
              color={actual.isSame(value, "day") ? "primary" : "text"}
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
  }, [currentDate, value, resolveDisabled, changeDate]);

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
  }, [value, changeDate, resolveDisabled, selectedYear, today, locale]);

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
              >
                <FiArrowLeft />
              </IconButton>
            </div>
            <div className={u.col}>
              {currentDate.format("MMMM")} - {currentDate.get("year")}
            </div>
            <div className={u.col}>
              <IconButton
                disabled={resolveDisabled(getNextMonthFirstDay(currentDate))}
                onClick={() => setCurrentDate(currentDate.add(1, "month"))}
                size="small"
              >
                <FiArrowRight />
              </IconButton>
            </div>
          </div>
          <div className={clsx(u.grid, s.calendar)}>
            {daysOfWeek.map((d) => (
              <div key={d} className={clsx(u["xs-1"], u["text-align-xs-center"], u["mb-xs-3"])}>
                <Text as="span" variant="body-2" color="muted">
                  {d}
                </Text>
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
