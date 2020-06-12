import * as React from "react";
import { useHarmonicIntervalFn, useTimeoutFn, useIsomorphicLayoutEffect } from "react-use";

type UseProgressOptions = {
  speed?: number;
  inc?: number;
  steps?: number[];
  waitUntilEnd?: number;
};

export function useProgress(options?: UseProgressOptions) {
  const { speed, inc, steps, waitUntilEnd }: UseProgressOptions = {
    speed: 300,
    inc: 10,
    steps: [],
    waitUntilEnd: 200,
    ...options,
  };
  const [progress, setProgress] = React.useState(0);
  const [freezed, setFreezed] = React.useState(true);
  const [step, setStep] = React.useState(0);
  const [wait, setWait] = React.useState(true);

  const [, cancel, reset] = useTimeoutFn(() => {
    if (wait) {
      setWait(false);
    }
  }, waitUntilEnd);

  function isFinished() {
    if (progress >= 100) {
      setFreezed(true);
      setWait(true);
      reset();
    }
  }

  function ableToInc() {
    if (!steps?.length) return true;

    if (steps[step] >= progress) return true;

    return false;
  }

  useIsomorphicLayoutEffect(() => {
    cancel();
  }, []);

  useHarmonicIntervalFn(
    () => {
      const isAble = ableToInc();
      if (isAble) {
        setProgress((actual) => Math.min(actual + inc, 100, step === steps.length ? 100 : steps?.[step] ?? 100));
      }
      isFinished();
    },
    freezed ? null : speed
  );

  function start() {
    setProgress(0);
    setWait(false);
    setFreezed(false);
  }

  function add(value: number) {
    setProgress((actual) => Math.min(actual + value, 100));
  }

  function stop() {
    setFreezed(true);
  }

  function done() {
    setProgress(100);
    setFreezed(true);
    setWait(true);
    reset();
  }

  function changeStep(st?: number) {
    if (!steps?.length) throw new Error("Steps not provided");

    setStep((actual) => {
      if (st && st <= steps.length) return st;

      return Math.min(actual + 1, steps.length);
    });
  }

  return { start, add, stop, done, changeStep, progress, freezed, wait, step };
}
