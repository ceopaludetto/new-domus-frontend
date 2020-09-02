import * as React from "react";

import s from "./use-ripple.scss";

function isTouch(e: any): e is TouchEvent {
  return "touches" in e;
}

interface UseRippleOptions {
  center?: boolean;
  disabled?: boolean;
  noTouch?: boolean;
}

export function useRipple(
  ref: React.RefObject<HTMLElement>,
  { center = false, disabled = false, noTouch = false }: UseRippleOptions = {}
) {
  const frame = React.useRef(0);

  const handleActivate = React.useCallback(
    (e: MouseEvent | TouchEvent) => {
      const { top, left, width, height } = (e.currentTarget as HTMLElement).getBoundingClientRect();

      const clientX = isTouch(e) ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch(e) ? e.touches[0].clientY : e.clientY;

      const x = center ? width / 2 : clientX - left;
      const y = center ? height / 2 : clientY - top;

      let size = Math.max(width, height) * 2;

      if (size < 100) {
        size *= 1.5; // increase speed if element is too much small
      }

      const positionTop = clientX ? y - size / 2 : size / 2 - height / 2;
      const positionLeft = clientY ? x - size / 2 : width / 2 - size / 2;

      const ripple = document.createElement("span");

      ripple.style.top = `${positionTop}px`;
      ripple.style.left = `${positionLeft}px`;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.opacity = "0";
      ripple.style.transform = "scale(0)";
      ripple.classList.add(s.ripple);

      let opacity = 0;
      let transform = 0;

      function tween() {
        opacity = Math.min(opacity + 0.008, 0.2);
        transform = Math.min(transform + 0.03, 1);

        ripple.style.opacity = String(opacity);
        ripple.style.transform = `scale(${transform})`;

        if (transform < 1 || opacity < 0.2) {
          frame.current = window.requestAnimationFrame(tween);
        }
      }

      (e.currentTarget as HTMLElement).appendChild(ripple);
      window.requestAnimationFrame(tween);
    },
    [center]
  );

  const handleDeactivate = React.useCallback(
    (e: MouseEvent | TouchEvent) => {
      const els = (e.currentTarget as HTMLElement).querySelectorAll(`.${s.ripple}`);
      const last = els[els.length - 1] as HTMLElement;

      if (last) {
        let opacity = Number(last.style.opacity);
        let transform = Number(last.style.transform.replace("scale(", "").replace(")", ""));

        if (frame.current) {
          window.cancelAnimationFrame(frame.current);
          frame.current = 0;
        }

        let current = 0;

        // eslint-disable-next-line no-inner-declarations
        function finish() {
          opacity = Math.max(opacity - 0.006, 0);
          transform = Math.min(transform + 0.04, 1);

          last.style.transform = `scale(${transform})`;
          last.style.opacity = String(opacity);

          if (opacity > 0) {
            current = window.requestAnimationFrame(finish);
          } else {
            last.parentElement?.removeChild(last);
            if (current) {
              window.cancelAnimationFrame(current);
              current = 0;
            }
          }
        }

        window.requestAnimationFrame(finish);
      }
    },
    [frame]
  );

  React.useEffect(() => {
    if (ref.current && !disabled) {
      const instance = ref.current;

      instance.addEventListener("mousedown", handleActivate, { passive: true });
      instance.addEventListener("mouseup", handleDeactivate, { passive: true });
      if (!noTouch) {
        instance.addEventListener("touchstart", handleActivate, { passive: true });
        instance.addEventListener("touchend", handleDeactivate, { passive: true });
        instance.addEventListener("touchcancel", handleDeactivate, { passive: true });
      }
      instance.addEventListener("mouseleave", handleDeactivate, { passive: true });

      return () => {
        instance.removeEventListener("mousedown", handleActivate);
        instance.removeEventListener("mouseup", handleDeactivate);
        if (!noTouch) {
          instance.removeEventListener("touchstart", handleActivate);
          instance.removeEventListener("touchend", handleDeactivate);
          instance.removeEventListener("touchcancel", handleDeactivate);
        }
        instance.removeEventListener("mouseleave", handleDeactivate);
      };
    }

    return () => {};
  }, [ref, handleActivate, handleDeactivate, noTouch, disabled]);
}
