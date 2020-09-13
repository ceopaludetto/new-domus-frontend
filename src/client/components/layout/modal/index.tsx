import * as React from "react";
import { FiX } from "react-icons/fi";

import { Dialog, DialogProps, DialogTitle, DialogContent, DialogActions, Box, IconButton } from "@material-ui/core";

import { Tooltip } from "@/client/components/typography";

interface ModalProps extends DialogProps {
  title: string;
  actions?: React.ReactNode;
}

export function Modal({ onClose, open, title, id, children, actions, ...rest }: ModalProps) {
  return (
    <Dialog onClose={onClose} aria-labelledby={id} open={open} {...rest}>
      <Box display="flex" alignItems="center">
        <Box flex={1}>
          <DialogTitle id={id}>{title}</DialogTitle>
        </Box>
        <Box px={3} py={1.5}>
          <Tooltip title="Fechar">
            <IconButton color="primary" onClick={onClose as any}>
              <FiX />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <DialogContent>
        <Box py={1}>{children}</Box>
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}
