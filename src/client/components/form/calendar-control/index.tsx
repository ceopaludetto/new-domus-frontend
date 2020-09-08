import * as React from "react";
import { FiCalendar } from "react-icons/fi";
import { useLockBodyScroll } from "react-use";

import loadable from "@loadable/component";
import dayjs, { PluginFunc } from "dayjs";
import { Rifm } from "rifm";

import { Modal } from "@/client/components/layout";
import * as Masks from "@/client/helpers/masks";
import { useLocale } from "@/client/hooks";
import { getModule } from "@/client/utils/lazy";

import { Control } from "../control";
import { IconButton } from "../icon-button";

const Calendar = loadable(() => import("../calendar"));
const DayJSCustomParseFormatPlugin = loadable.lib(() => import("dayjs/plugin/customParseFormat"));

type CalendarControlProps = Omit<React.ComponentPropsWithRef<typeof Control>, "value" | "onChange"> &
  Omit<React.ComponentProps<typeof Calendar>, "isOpen">;

export const CalendarControl = React.forwardRef(
  (
    {
      id,
      name,
      disablePast,
      disableFuture,
      value: calendarValue,
      onChange: onCalendarChange,
      ...props
    }: CalendarControlProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const locale = useLocale();
    const iconButton = React.useRef<HTMLButtonElement>(null);
    const plugin = React.useRef<PluginFunc<any> & { default: PluginFunc<any> }>(null);
    const [open, setOpen] = React.useState(false);
    const [controlValue, setControlValue] = React.useState(() => dayjs(calendarValue).format("DD/MM/YYYY"));
    useLockBodyScroll(open);

    function handleOpen() {
      setOpen(true);
    }

    function handleChange(str: string) {
      setControlValue(str);
    }

    React.useEffect(() => {
      if (plugin.current) {
        dayjs.extend(getModule(plugin.current));
        if (controlValue.length >= 10) {
          const parsed = dayjs(controlValue, "DD/MM/YYYY");
          if (parsed.isValid() && !parsed.isSame(calendarValue)) {
            onCalendarChange(parsed.toDate());
          }
        }
      }
    }, [controlValue, onCalendarChange, calendarValue]);

    return (
      <>
        <DayJSCustomParseFormatPlugin ref={plugin} />
        <Modal open={open} onClose={() => setOpen(false)}>
          <Calendar
            id={id}
            isOpen={open}
            value={calendarValue}
            disablePast={disablePast}
            disableFuture={disableFuture}
            onChange={(date) => {
              onCalendarChange(date);
              setControlValue(dayjs(date).locale(locale).format("DD/MM/YYYY"));
            }}
            onClose={() => {
              setOpen(false);
              iconButton?.current?.focus();
            }}
          />
        </Modal>
        <Rifm format={Masks.date} value={controlValue} onChange={handleChange}>
          {({ onChange, value }) => (
            <Control
              id={id}
              ref={ref}
              name={name}
              value={value}
              onChange={onChange}
              onFocus={() => DayJSCustomParseFormatPlugin.load()}
              placeholder="DD/MM/YYYY"
              append={
                <IconButton
                  ref={iconButton}
                  aria-label="Abrir Calendário"
                  tooltip={{ content: "Abrir Calendário" }}
                  onFocus={() => Calendar.load()}
                  onMouseOver={() => Calendar.load()}
                  type="button"
                  onClick={handleOpen}
                >
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
