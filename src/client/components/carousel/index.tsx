import { useCallback, useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Box, CardMedia, IconButton } from "@material-ui/core";
import { m as motion, Variants, AnimatePresence } from "framer-motion";

import { useStyles } from "./styles";

const variants: Variants = {
  exit: (direction: number) => ({
    zIndex: 0,
    opacity: 0.5,
    position: "absolute",
    x: direction < 0 ? 300 : -300,
  }),
  enter: {
    zIndex: 1,
    opacity: 1,
    position: "absolute",
    x: 0,
  },
  initial: (direction: number) => ({
    opacity: 0,
    position: "absolute",
    x: direction > 0 ? 300 : -300,
  }),
};

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface CarouselProps {
  images: string[];
  aspect?: number;
}

const MotionCardMedia = motion(CardMedia);

export function Carousel({ images, aspect = 1 }: CarouselProps) {
  const classes = useStyles();
  const [[slide, direction], setSlide] = useState<[number, number]>([0, 0]);

  const index = useMemo(() => wrap(0, images.length, slide), [images, slide]);

  const handleChange = useCallback((value: number) => {
    setSlide((current) => [current[0] + value, value]);
  }, []);

  return (
    <Box position="relative" pt={`${aspect * 100}%`}>
      <AnimatePresence initial={false} custom={direction}>
        <MotionCardMedia
          key={slide}
          className={classes.image}
          image={images[index]}
          variants={variants}
          animate="enter"
          initial="initial"
          exit="exit"
          custom={direction}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        />
      </AnimatePresence>
      {images.length > 1 && (
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
            <IconButton
              className={classes.icon}
              color="secondary"
              aria-label="Foto Anterior"
              onClick={() => handleChange(-1)}
            >
              <FiChevronLeft />
            </IconButton>
          </Box>
          <Box px={1}>
            <IconButton
              className={classes.icon}
              color="secondary"
              aria-label="Próxima Foto"
              onClick={() => handleChange(+1)}
            >
              <FiChevronRight />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
