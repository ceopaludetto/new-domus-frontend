import { useCallback, useState } from "react";

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface UseDialogOptions {
  title: string;
  content?: string;
  onDelete: () => void;
  onClose?: () => void;
}

function useDialog({ title, content, onDelete, onClose }: UseDialogOptions) {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    setOpen(false);
  }, [onClose]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete();
    setOpen(false);
  }, [onDelete]);

  return { open, handleOpen, handleClose, handleDelete, title, content };
}

type RemoveDialogProps = Omit<ReturnType<typeof useDialog>, "handleOpen">;

const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    padding: theme.spacing(0, 2, 2),
  },
}));

export function RemoveDialog({ title, open, content, handleClose, handleDelete }: RemoveDialogProps) {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      {content && (
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions className={classes.actions}>
        <Button color="primary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleDelete}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

RemoveDialog.useDialog = useDialog;
