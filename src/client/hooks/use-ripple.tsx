import * as React from "react";

import s from "./use-ripple.scss";

function isTouch(e: any): e is TouchEvent {
  return Array.isArray(e.touches);
}

interface UseRippleOptions {
  center?: boolean;
}

export function useRipple(ref: React.RefObject<HTMLElement>, { center = false }: UseRippleOptions = {}) {
  const handleActivate = React.useCallback(
    (e: MouseEvent | TouchEvent) => {
      const { top, left, width, height } = (e.currentTarget as HTMLElement).getBoundingClientRect();

      const clientX = isTouch(e) ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch(e) ? e.touches[0].clientY : e.clientY;

      const x = center ? width / 2 : clientX - left;
      const y = center ? height / 2 : clientY - top;

      let size = Math.max(width, height) * 2;

      if (size < 100) {
        size *= 2; // increase speed if element is too much small
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

      let start!: number;

      function tween(timestamp: number) {
        if (!start) start = timestamp;

        const curr = timestamp - start;

        const opacity = Math.min(curr / 1000, 0.2);
        const transform = Math.min(curr / 1000, 1);

        ripple.style.opacity = String(opacity);
        ripple.style.transform = `scale(${transform})`;

        if (transform < 1 || opacity < 0.3) {
          window.requestAnimationFrame(tween);
        }
      }

      (e.currentTarget as HTMLElement).appendChild(ripple);
      window.requestAnimationFrame(tween);
    },
    [center]
  );

  const handleDeactivate = React.useCallback((e: MouseEvent | TouchEvent) => {
    const els = (e.currentTarget as HTMLElement).querySelectorAll(`.${s.ripple}`);
    const last = els[els.length - 1] as HTMLElement;

    if (last) {
      let start!: number;

      let opacity = Number(last.style.opacity);
      let transform = Number(last.style.transform.replace("scale(", "").replace(")", ""));

      // eslint-disable-next-line no-inner-declarations
      function finish(timestamp: number) {
        if (!start) start = timestamp;

        const curr = timestamp - start;

        opacity = Math.max(opacity - curr / 20000, 0);
        transform = Math.min(transform + curr / 3000, 1);

        last.style.transform = `scale(${transform})`;
        last.style.opacity = String(opacity);

        if (opacity > 0) {
          window.requestAnimationFrame(finish);
        } else {
          last.parentElement?.removeChild(last);
        }
      }

      window.requestAnimationFrame(finish);
    }
  }, []);

  React.useEffect(() => {
    if (ref.current) {
      const instance = ref.current;

      instance.addEventListener("mousedown", handleActivate);
      instance.addEventListener("touchstart", handleActivate);
      instance.addEventListener("mouseup", handleDeactivate);
      instance.addEventListener("touchend", handleDeactivate);
      instance.addEventListener("touchcancel", handleDeactivate);
      instance.addEventListener("mouseleave", handleDeactivate);

      return () => {
        instance.removeEventListener("mousedown", handleActivate);
        instance.removeEventListener("touchstart", handleActivate);
        instance.removeEventListener("mouseup", handleDeactivate);
        instance.removeEventListener("touchend", handleDeactivate);
        instance.removeEventListener("touchcancel", handleDeactivate);
        instance.removeEventListener("mouseleave", handleDeactivate);
      };
    }

    return () => {};
  }, [ref, handleActivate, handleDeactivate]);
}
