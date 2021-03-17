import * as React from "react";
import { FiX } from "react-icons/fi";

import { Snackbar, IconButton } from "@material-ui/core";

export function useSnackbar() {
  const [content, setContent] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = React.useCallback((message: string) => {
    setContent(message);
    setIsOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return { handleOpen, handleClose, content, isOpen };
}

type SnackbarWrapperProps = ReturnType<typeof useSnackbar> & { autoHideDuration?: number };

export function SnackbarWrapper({ content, isOpen, handleClose, autoHideDuration = 5000 }: SnackbarWrapperProps) {
  return (
    <Snackbar
      message={content}
      open={isOpen}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      action={
        <IconButton size="small" onClick={handleClose} color="inherit">
          <FiX />
        </IconButton>
      }
    />
  );
}

const SnackbarContext = React.createContext<SnackbarWrapperProps>({
  content: "",
  isOpen: false,
  autoHideDuration: 5000,
  handleOpen: (message: string) => {},
  handleClose: () => {},
});

export function SnackbarProvider({ children, ...rest }: SnackbarWrapperProps & { children: React.ReactNode }) {
  return <SnackbarContext.Provider value={rest}>{children}</SnackbarContext.Provider>;
}

export function useSnackbarContext() {
  return React.useContext(SnackbarContext);
}
