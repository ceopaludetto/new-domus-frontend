import * as React from "react";
import { FiUpload, FiX } from "react-icons/fi";

import { ButtonBase, Theme, Typography, Box, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import { merge } from "@/client/utils/merge.refs";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "block",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    border: `1px dashed ${theme.palette.divider}`,
    transition: theme.transitions.create("border-color", {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    "&:hover, &:active": {
      borderColor: theme.palette.primary.main,
    },
  },
  error: {
    borderColor: `${theme.palette.error.main} !important`,
  },
  input: {
    display: "none",
  },
}));

interface UploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: boolean;
}

export const Upload = React.forwardRef<HTMLInputElement, UploadProps>(
  ({ label, id, onChange, error, ...rest }, ref) => {
    const classes = useStyles();
    const innerRef = React.useRef<HTMLInputElement>(null);
    const [files, setFiles] = React.useState<FileList | undefined>(undefined);

    const handleChange = React.useCallback(
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

    const handleRemove = React.useCallback(
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
        <ButtonBase component="label" htmlFor={id} className={clsx(classes.root, error && classes.error)}>
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Box pr={1.5} display="inline-flex">
              <FiUpload size={20} />
            </Box>
            <Box flex={1}>
              <Typography component="span" variant="subtitle1">
                {files?.length ? files.item(0)?.name : label}
              </Typography>
            </Box>
            {files?.length && (
              <Box pl={1.5}>
                <IconButton size="small" onClick={handleRemove}>
                  <FiX size={20} />
                </IconButton>
              </Box>
            )}
          </Box>
        </ButtonBase>
      </>
    );
  }
);
