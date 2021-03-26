import React, { useRef, useState, useCallback, forwardRef } from "react";
import { FiUpload, FiX } from "react-icons/fi";

import { ButtonBase, Theme, Typography, Box, IconButton, Card, CardContent, fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import { Spacer } from "@/client/components/layout";
import { merge } from "@/client/utils/merge.refs";

const useStyles = makeStyles((theme: Theme) => {
  const borderColor = theme.palette.type === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";

  return {
    root: {
      width: "100%",
      display: "block",
      padding: theme.spacing(3),
      borderRadius: theme.shape.borderRadius,
      border: `1px dashed ${borderColor}`,
      transition: theme.transitions.create(["border-color", "background-color"], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
      }),
      "&:hover": {
        borderColor: theme.palette.secondary.main,
        backgroundColor: fade(theme.palette.secondary.main, 0.05),
      },
      "&$dragging": {
        borderColor: theme.palette.primary.main,
        backgroundColor: fade(theme.palette.primary.main, 0.05),
      },
    },
    dragging: {},
    error: {
      borderColor: `${theme.palette.error.main} !important`,
    },
    input: {
      display: "none",
    },
    noPointerEvents: {
      pointerEvents: "none",
      userSelect: "none",
    },
  };
});

interface UploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: boolean;
}

export const Upload = forwardRef<HTMLInputElement, UploadProps>(({ label, id, onChange, error, ...rest }, ref) => {
  const classes = useStyles();

  const innerRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<FileList | undefined>(undefined);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget?.files?.length) {
        setFiles(e.currentTarget?.files);
      } else {
        setFiles(undefined);
      }

      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (innerRef.current) {
        innerRef.current.value = "";
      }
      setFiles(undefined);
    },
    [innerRef, setFiles]
  );

  const handleOnDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();

      if (innerRef?.current) {
        innerRef.current.files = e.dataTransfer.files;
      }
      setFiles(e.dataTransfer.files);
    },
    [innerRef]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <input
        type="file"
        id={id}
        ref={merge([innerRef, ref])}
        onChange={handleChange}
        className={classes.input}
        {...rest}
      />
      <Spacer vertical={2} horizontal={0}>
        <ButtonBase
          component="label"
          onDragEnter={() => setDragging(true)}
          onDragLeave={() => setDragging(false)}
          onDragOver={handleDragOver}
          onDrop={handleOnDrop}
          htmlFor={id}
          className={clsx(classes.root, dragging && classes.dragging, error && classes.error)}
        >
          <Box
            className={classes.noPointerEvents}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <Box pb={2} display="inline-flex">
              <FiUpload size={40} />
            </Box>
            <Box>
              <Typography component="span" variant="subtitle2">
                {label}
              </Typography>
            </Box>
          </Box>
        </ButtonBase>
        {files &&
          Array.from(files).map((file) => (
            <Card variant="outlined" key={file.name}>
              <CardContent>{file.name}</CardContent>
            </Card>
          ))}
      </Spacer>
    </>
  );
});
