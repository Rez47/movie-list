import { Dispatch, SetStateAction, useEffect } from "react";
import { Alert as MUIAlert } from "@mui/material";

export type AlertType = {
  message: string;
  severity: "success" | "info" | "warning" | "error";
};

interface AlertProps {
  severity: "success" | "info" | "warning" | "error";
  text: string;
  showError: boolean;
  setShowError: Dispatch<SetStateAction<boolean>>;
  isStatic?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  severity,
  text,
  showError,
  setShowError,
  isStatic,
}) => {
  useEffect(() => {
    if (!isStatic) {
      const timeout = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isStatic, setShowError]);

  return (
    <>
      {showError && (
        <MUIAlert variant="filled" severity={severity}>
          {text}
        </MUIAlert>
      )}
    </>
  );
};

export default Alert;
