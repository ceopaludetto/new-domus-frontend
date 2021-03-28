import { useMemo, useState } from "react";

import type { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  aspectRatio?: number;
  rounded?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  rounded: {
    borderRadius: theme.shape.borderRadius,
  },
}));

export function Image({ src, width, height, aspectRatio, alt, rounded = true, ...rest }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();

  const dim = useMemo(() => {
    if (width && height) {
      return { width, height };
    }

    if (aspectRatio) {
      if (width) {
        return { width, height: width * aspectRatio };
      }

      if (height) {
        return { width: height * aspectRatio, height };
      }
    }

    if (width) {
      return { width };
    }

    if (height) {
      return { height };
    }

    throw new Error("You must specify some dimension");
  }, [width, height, aspectRatio]);

  return (
    <>
      {src && (
        <img
          src={src}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          alt={alt}
          width={dim.width}
          height={dim.height}
          className={clsx(rounded && classes.rounded)}
          {...rest}
        />
      )}
      {!loaded && <div>fallback</div>}
    </>
  );
}
