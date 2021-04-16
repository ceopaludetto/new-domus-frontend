import { ReactNode, useCallback, useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Box, IconButton } from "@material-ui/core";
import { m as motion, AnimatePresence, Variants } from "framer-motion";

const variants: Variants = {
  exit: (direction: number) => ({
    zIndex: 0,
    opacity: 0.5,
    position: "absolute",
    x: direction > 0 ? -300 : 300,
  }),
  enter: {
    zIndex: 1,
    opacity: 1,
    x: 0,
  },
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 300 : -300,
  }),
};

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface CarouselProps {
  children: (index: number) => ReactNode;
  count: number;
}

export function Carousel({ children, count }: CarouselProps) {
  const [[slide, direction], setSlide] = useState<[number, number]>([0, 0]);

  const index = useMemo(() => wrap(0, count, slide), [count, slide]);

  const handleChange = useCallback((value: number) => {
    setSlide((current) => [current[0] + value, value]);
  }, []);

  return (
    <Box position="relative">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide}
          variants={variants}
          animate="enter"
          exit="exit"
          initial="initial"
          custom={direction}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          {children(index)}
        </motion.div>
      </AnimatePresence>
      {count > 1 && (
        <Box
          position="absolute"
          top="0"
          width="100%"
          height="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          zIndex={2}
        >
          <Box px={1}>
            <IconButton color="secondary" aria-label="Foto Anterior" onClick={() => handleChange(-1)}>
              <FiChevronLeft />
            </IconButton>
          </Box>
          <Box px={1}>
            <IconButton color="secondary" aria-label="Próxima Foto" onClick={() => handleChange(+1)}>
              <FiChevronRight />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
