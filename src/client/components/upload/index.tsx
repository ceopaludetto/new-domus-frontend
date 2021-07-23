/* eslint-disable no-await-in-loop */
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { FiMinus } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";

import { Paper, ButtonBase, Grid, IconButton, Box, Typography, CircularProgress } from "@material-ui/core";
import clsx from "clsx";
import pretty from "pretty-bytes";

import { getCroppedImg } from "@/client/utils/image";

import { cropImage } from "../cropper";
import { Tooltip } from "../tooltip";
import { useStyles } from "./styles";

interface UploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  name: string;
  accept: string;
  label: string;
  crop?: boolean;
  aspect?: number;
}

export function Upload({ accept, className, multiple, crop = false, aspect = 1, name, label, ...rest }: UploadProps) {
  const classes = useStyles();
  const { register, unregister, watch, setValue } = useFormContext();
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLoading(true);
      try {
        if (crop) {
          const uris = acceptedFiles.map((file) => URL.createObjectURL(file));
          const croppeds = await cropImage({ images: uris, aspect });

          const files: File[] = await Promise.all(
            croppeds.map(async (item, idx) => {
              const blob = await getCroppedImg(uris[idx], item);

              URL.revokeObjectURL(uris[idx]);

              return new File([blob], acceptedFiles[idx].name);
            })
          );

          setValue(name, files, { shouldValidate: true });
        } else {
          setValue(name, acceptedFiles, { shouldValidate: true });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error?.message ?? "Fail to upload file");
      } finally {
        setLoading(false);
      }
    },
    [setValue, name, aspect, crop]
  );

  const { getInputProps, getRootProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept,
    multiple,
    onDrop: handleDrop,
  });

  const files: File[] = watch(name, []);

  useEffect(() => {
    if (Array.isArray(files)) {
      setUrls(files.map((file) => URL.createObjectURL(file)));

      return () => {
        setUrls((current) => {
          current.map((url) => URL.revokeObjectURL(url));

          return [];
        });
      };
    }
    return () => {};
  }, [files]);

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  const handleRemove = useCallback(
    (fileToBeRemoved: File) => {
      const newFiles = files.filter((file) => file !== fileToBeRemoved);

      setValue(name, newFiles, { shouldValidate: true });
    },
    [files, setValue, name]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ButtonBase
          aria-label="Selecionar arquivo"
          className={clsx(classes.root, isDragActive && classes.active, className)}
          {...getRootProps()}
        >
          <input type="file" name={name} {...getInputProps()} {...rest} />
          <Grid container spacing={3} justify="center">
            <Grid item>
              {loading ? (
                <Grid container direction="column">
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                  <Grid item>
                    <Box mt={2}>
                      <Typography>Processando imagens...</Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        Aguarde um instante.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Grid container direction="column">
                  <Grid item>
                    <IoImageOutline size={50} className={classes.icon} />
                  </Grid>
                  <Grid item>
                    <Box mt={2}>
                      <Typography>{label}</Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {isDragReject && <>{multiple ? "Alguns arquivos são inválidos." : "Arquivo inválido."}</>}
                        {isDragAccept && <>{multiple ? "Todos os arquivos são válidos." : "Arquivo válido."}</>}
                        {!isDragActive && "Arraste arquivos ou clique para selecioná-los."}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </ButtonBase>
      </Grid>
      {files?.map((file, index) => (
        <Grid key={file.name} item xs={12} md={6}>
          <Paper className={classes.paper} elevation={0}>
            <Box p={2}>
              <Grid container spacing={3} alignItems="center">
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <img draggable={false} className={classes.image} height="50" src={urls[index]} alt={file.name} />
                  </Box>
                </Grid>
                <Grid className={classes.titleRoot} item xs>
                  <Typography color="primary" variant="subtitle2">
                    {pretty(file.size)}
                  </Typography>
                  <Typography title={file.name} className={classes.title}>
                    {file.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip title="Remover arquivo">
                    <IconButton onClick={() => handleRemove(file)} aria-label="Remover arquivo">
                      <FiMinus />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
