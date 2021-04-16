import {
  MouseEvent,
  SyntheticEvent,
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import { FiX } from "react-icons/fi";

import { Snackbar, IconButton, Theme, NoSsr } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  snackbar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

export function useSnackbar() {
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback((message: string) => {
    setContent(message);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback((event: SyntheticEvent | MouseEvent<HTMLButtonElement>, reason?: string) => {
    if (reason === "clickaway") return;
    setIsOpen(false);
  }, []);

  const handleExited = useCallback(() => {
    setContent("");
  }, []);

  return { handleOpen, handleClose, handleExited, content, isOpen };
}

type SnackbarWrapperProps = ReturnType<typeof useSnackbar> & { autoHideDuration?: number };

export function SnackbarWrapper({
  content,
  isOpen,
  handleClose,
  handleExited,
  autoHideDuration = 5000,
}: SnackbarWrapperProps) {
  const classes = useStyles();
  const key = useMemo(() => (typeof window !== "undefined" ? window.btoa(content) : ""), [content]);

  return (
    <NoSsr>
      <Snackbar
        key={key}
        message={content}
        open={isOpen}
        onClose={handleClose}
        onExited={handleExited}
        autoHideDuration={autoHideDuration}
        ContentProps={{ elevation: 0, classes: { root: classes.snackbar } }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        action={
          <IconButton size="small" onClick={handleClose} color="inherit">
            <FiX />
          </IconButton>
        }
      />
    </NoSsr>
  );
}

const SnackbarContext = createContext<SnackbarWrapperProps>({
  content: "",
  isOpen: false,
  autoHideDuration: 5000,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleOpen: (message: string) => {},
  handleClose: () => {},
  handleExited: () => {},
});

export function SnackbarProvider({ children, ...rest }: SnackbarWrapperProps & { children: ReactNode }) {
  return <SnackbarContext.Provider value={rest}>{children}</SnackbarContext.Provider>;
}

export function useSnackbarContext() {
  return useContext(SnackbarContext);
}
