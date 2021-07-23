import { ComponentPropsWithoutRef, useCallback, useEffect, useState } from "react";
import EasyCropper from "react-easy-crop";
import type { Area } from "react-easy-crop/types";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";

import { useReactiveVar } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  NoSsr,
  Box,
  Button,
  Grid,
  Typography,
  Slider,
  Chip,
} from "@material-ui/core";

import { cropperStorage } from "@/client/providers/storages";

import { Spacer } from "../spacer";
import { useStyles } from "./styles";

type CropperProps = Omit<
  ComponentPropsWithoutRef<typeof EasyCropper>,
  "zoom" | "onZoomChange" | "image" | "crop" | "onCropChange" | "aspect"
>;

export default function Cropper(props: Partial<CropperProps>) {
  const classes = useStyles();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [index, setIndex] = useState(0);

  const cropper = useReactiveVar(cropperStorage);
  const [cropped, setCropped] = useState<Area[]>(() =>
    new Array(cropper?.images.length).fill({ x: 0, y: 0, width: 0, height: 0 })
  );

  const handleCropComplete = useCallback(
    (_, croppedAreaPixels: Area) => {
      setCropped((current) => {
        const clone = current;
        clone[index] = croppedAreaPixels;

        return clone;
      });
    },
    [index]
  );

  const handleCancel = useCallback(() => {
    cropper?.onCancel();
    cropperStorage(undefined);
  }, [cropper]);

  const handleFinish = useCallback(() => {
    if (index + 1 < (cropper?.images?.length ?? 0)) {
      setIndex((current) => current + 1);
    } else {
      cropper?.onCropComplete(cropped);
      cropperStorage(undefined);
    }
  }, [cropper, cropped, index]);

  useEffect(() => {
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setIndex(0);
    setCropped(new Array(cropper?.images.length).fill({ x: 0, y: 0, width: 0, height: 0 }));
  }, [cropper]);

  useEffect(() => {
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  }, [index]);

  return (
    <NoSsr>
      {cropper && (
        <Dialog open={!!cropper}>
          <DialogTitle>
            <Grid container spacing={3} justify="space-between" alignItems="center">
              <Grid item>
                <Typography component="span" variant="h6">
                  Cortar Imagem
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  color="secondary"
                  label={
                    <>
                      {index + 1} / {cropper.images.length}
                    </>
                  }
                />
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Box position="relative" minWidth="500px" minHeight="500px">
              <EasyCropper
                image={cropper.images[index]}
                crop={crop}
                onCropChange={setCrop}
                zoom={zoom}
                onZoomChange={setZoom}
                minZoom={1}
                maxZoom={5}
                onCropComplete={handleCropComplete}
                aspect={cropper.aspect}
                classes={{ containerClassName: classes.cropContainer, cropAreaClassName: classes.cropArea }}
                {...props}
              />
            </Box>
            <Box py={2}>
              <Grid alignItems="center" container spacing={3} justify="space-between">
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <AiOutlineZoomOut size={24} />
                    </Box>
                    <Box mx={2} flex={1}>
                      <Slider
                        id="zoom"
                        aria-labelledby="zoom-label"
                        step={0.1}
                        min={1}
                        max={5}
                        value={zoom}
                        onChange={(e, value) => setZoom(value as number)}
                      />
                    </Box>
                    <Box mr={3}>
                      <AiOutlineZoomIn size={24} />
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box textAlign="right">
                    <Spacer>
                      <Button onClick={handleCancel} color="primary">
                        Cancelar
                      </Button>
                      <Button onClick={handleFinish} color="primary" variant="contained">
                        {index + 1 < cropper.images.length ? "Próximo" : "Finalizar"}
                      </Button>
                    </Spacer>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </NoSsr>
  );
}

interface CropImageProps {
  images: string[];
  aspect?: number;
}

export function cropImage({ images, aspect = 1 }: CropImageProps) {
  return new Promise<Area[]>((resolve, reject) => {
    cropperStorage({
      images,
      onCropComplete: resolve,
      onCancel: () => reject(new Error("Fail to crop image")),
      aspect,
    });
  });
}
