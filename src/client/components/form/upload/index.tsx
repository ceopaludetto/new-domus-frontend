import React, { useRef, useState, useCallback, forwardRef } from "react";
import { FiX } from "react-icons/fi";
import { IoImagesOutline } from "react-icons/io5";

import { ButtonBase, Theme, Typography, Box, IconButton, Card, fade, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import prettyBytes from "pretty-bytes";

import { Spacer, Image } from "@/client/components/layout";
import { Tooltip } from "@/client/components/typography";
import { fileReader } from "@/client/utils/file";
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
  labelOnDragging?: string;
  icon?: React.ReactNode;
  showPreview?: boolean;
  error?: boolean;
}

export const Upload = forwardRef<HTMLInputElement, UploadProps>(
  ({ label, id, onChange, error, multiple, labelOnDragging, icon, showPreview = true, ...rest }, ref) => {
    const classes = useStyles();

    const innerRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [images, setImages] = useState<Record<string, string>>();

    const loadFile = useCallback((file: File) => {
      fileReader(file)
        .then((content) => setImages((current) => ({ ...current, [file.name]: content })))
        .catch(console.error);
    }, []);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget?.files?.length) {
          if (showPreview) {
            for (const file of e.currentTarget.files) {
              loadFile(file);
            }
          }

          setFiles(Array.from(e.currentTarget?.files));
        } else {
          setFiles([]);
        }

        onChange?.(e);
      },
      [onChange, loadFile, showPreview]
    );

    const handleRemove = useCallback(
      (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const newFiles = files.filter((file, i) => i !== index);

        if (innerRef.current) {
          const dataTransfer = new DataTransfer();

          for (const file of newFiles) {
            dataTransfer.items.add(file);
          }

          innerRef.current.files = dataTransfer.files;
        }

        setFiles(newFiles);
      },
      [innerRef, files]
    );

    const handleOnDrop = useCallback(
      (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();

        if (showPreview) {
          for (const file of e.dataTransfer.files) {
            loadFile(file);
          }
        }

        const mergedFiles = [...e.dataTransfer.files];

        const dataTransfer = new DataTransfer();

        if (innerRef?.current?.files) {
          mergedFiles.push(...innerRef.current.files);
        }

        const filterd = mergedFiles.filter((file, i) => {
          const index = mergedFiles.findIndex((item) => item.lastModified === file.lastModified);

          if (index !== i) {
            return false;
          }

          return true;
        });

        for (const file of filterd) {
          dataTransfer.items.add(file);
        }

        if (innerRef.current?.files) {
          innerRef.current.files = dataTransfer.files;
        }

        setFiles(filterd);
        setDragging(false);
      },
      [innerRef, loadFile, showPreview]
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
          multiple={multiple}
          {...rest}
        />
        <Spacer vertical={2} horizontal={0}>
          <ButtonBase
            component="label"
            disableRipple
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
                {icon ?? <IoImagesOutline size={40} />}
              </Box>
              <Box>
                <Typography component="span" variant="subtitle2">
                  {dragging && labelOnDragging ? labelOnDragging : label}
                </Typography>
              </Box>
            </Box>
          </ButtonBase>
          {files &&
            files.map((file, index) => (
              <Card variant="outlined" key={file.name}>
                <Box p={1.5}>
                  <Grid container alignItems="center" spacing={2}>
                    {showPreview && (
                      <Grid item>
                        <Box display="flex">
                          <Image src={images?.[file.name]} alt={file.name} width={40} />
                        </Box>
                      </Grid>
                    )}
                    <Grid xs item>
                      <Typography variant="body1">{file.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {prettyBytes(file.size)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Remover Imagem">
                        <IconButton aria-label={`Remover ${file.name}`} onClick={handleRemove(index)}>
                          <FiX />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            ))}
        </Spacer>
      </>
    );
  }
);
