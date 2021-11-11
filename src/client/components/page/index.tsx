import type { ReactNode } from "react";

import { Box, Container } from "@mui/material";
import { motion, Variants } from "framer-motion";

import { useAnimatedHeader } from "@/client/utils/hooks";

import { Header } from "../header";

interface PageProps {
  title: string;
  children: ReactNode;
  tabs?: ReactNode;
}

const animationVariants: Variants = {
  show: {
    translateY: 0,
    transition: {
      duration: 0.125,
      ease: "easeInOut",
    },
  },
  hide: (height: number) => ({
    translateY: -height,
    transition: {
      duration: 0.125,
      ease: "easeInOut",
    },
  }),
};

const AnimatedBox = motion(Box);

export function Page({ title, children, tabs }: PageProps) {
  const [ref, { shouldShow, height }] = useAnimatedHeader<HTMLDivElement>({ hasTabs: !!tabs });

  return (
    <>
      <AnimatedBox
        sx={{
          backdropFilter: "saturate(180%) blur(5px)",
          position: "sticky",
          mb: 3,
          top: 0,
        }}
        animate={shouldShow ? "show" : "hide"}
        variants={animationVariants}
        custom={height}
      >
        <Header ref={ref} title={title} hasTabs={!!tabs} />
        {tabs && <Box sx={{ px: 3 }}>{tabs}</Box>}
      </AnimatedBox>
      <Container maxWidth={false}>{children}</Container>
    </>
  );
}
