import * as React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useMeasure } from "react-use";

import clsx from "clsx";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { Container, Paper } from "@/client/components";
import u from "@/client/styles/utils.scss";
import { RouteComponentProps } from "@/client/utils/common.dto";

import s from "./index.scss";

const variants: Variants = {
  initial: {
    opacity: 0,
    x: -25,
    transition: {
      ease: "easeInOut",
    },
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.45,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: 25,
    transition: {
      ease: "easeInOut",
    },
  },
};

export default function Auth({ routes }: RouteComponentProps) {
  const location = useLocation();
  const [ref, { height }] = useMeasure<HTMLDivElement>();

  return (
    <Container className={s.container} fluid>
      <div className={clsx(u.row, u["align-items-xs-center"], u["justify-content-xs-center"], u["h-100"])}>
        <motion.div
          initial={{ maxWidth: location.pathname === "/auth/signup" ? 900 : 550 }}
          animate={{ maxWidth: location.pathname === "/auth/signup" ? 900 : 550 }}
          transition={{ delay: 0.15, ease: "easeInOut", when: "beforeChildren" }}
          className={clsx(u.col, u["w-100"])}
        >
          <Paper
            as={motion.div}
            initial={{ height: "auto" }}
            animate={{ height: height + 58 }}
            transition={{ delay: 0.15, ease: "easeInOut", when: "beforeChildren" }}
            outline
            size="large"
          >
            <AnimatePresence exitBeforeEnter initial={false}>
              <motion.div
                ref={ref}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                key={location.pathname}
              >
                <Switch location={location}>
                  {routes?.map(({ name, ...rest }) => (
                    <Route key={name} {...rest} />
                  ))}
                </Switch>
              </motion.div>
            </AnimatePresence>
          </Paper>
        </motion.div>
      </div>
    </Container>
  );
}
