import { useCallback, useEffect, useState } from "react";

import { useReactiveVar } from "@apollo/client";
import { Snackbar } from "@material-ui/core";

import { snackbarStorage } from "@/client/providers/storages";

export default function SnackbarContainer() {
  const context = useReactiveVar(snackbarStorage);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(() => context?.message);

  useEffect(() => {
    if (context) {
      setMessage(context?.message);
    }
    setOpen(!!context);
  }, [context]);

  const handleFinish = useCallback(async () => {
    snackbarStorage(undefined);
  }, []);

  return (
    <Snackbar
      key={context?.key}
      open={open}
      autoHideDuration={context?.duration ?? 5000}
      message={message}
      onClose={handleFinish}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    />
  );
}
