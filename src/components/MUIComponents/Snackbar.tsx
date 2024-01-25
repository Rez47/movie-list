import { Snackbar as MUISnackbar, Alert, AlertColor } from "@mui/material";

interface SnackbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  severity: AlertColor;
  variant?: "filled" | "standard" | "outlined";
  autoHideDuration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  setOpen,
  message,
  variant = "filled",
  severity,
  autoHideDuration = 3000,
}) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <MUISnackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} variant={variant}>
          {message}
        </Alert>
      </MUISnackbar>
    </div>
  );
};

export default Snackbar;
