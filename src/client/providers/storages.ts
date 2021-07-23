import type { Area } from "react-easy-crop/types";

import { makeVar } from "@apollo/client";

export const condominiumStorage = makeVar("");
export const tokenStorage = makeVar("");

export interface SnackbarProps {
  key?: string;
  message: string;
  duration?: number;
}

export const snackbarStorage = makeVar<SnackbarProps | undefined>(undefined);

export interface CropperProps {
  images: string[];
  aspect: number;
  onCropComplete: (cropped: Area[]) => void;
  onCancel: () => void;
}

export const cropperStorage = makeVar<CropperProps | undefined>(undefined);

export const sidebarStorage = makeVar(false);
