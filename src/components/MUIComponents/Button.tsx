import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
  label: string;
  isSubmit?: boolean;
  sx?: object;
}

const Button: React.FC<ButtonProps> = ({ label, isSubmit, sx }) => {
  return (
    <MUIButton
      type={isSubmit ? "submit" : "button"}
      variant="contained"
      sx={sx}
    >
      {label}
    </MUIButton>
  );
};

export default Button;
