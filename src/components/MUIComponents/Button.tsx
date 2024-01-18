import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
  label: string;
  isSubmit?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, isSubmit }) => {
  return (
    <MUIButton type={isSubmit ? "submit" : "button"} variant="contained">
      {label}
    </MUIButton>
  );
};

export default Button;
