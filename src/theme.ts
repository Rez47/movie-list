import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const staticThemeColors = {
  grey: {
    50: "#F5F5F5",
    100: "#EAEAEA",
    200: "#D5D5D5",
    300: "#CACACA",
    400: "#C0C0C0",
    500: "#B5B5B5",
    600: "#A0A0A0",
    700: "#8A8A8A",
    800: "#808080",
    900: "#555555",
  },
};

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      common: {
        white: "#FFFFFF",
        black: "#000000",
      },
      text: {
        primary: "#ffffff",
      },
      background: {
        default: "#343A40",
      },
      primary: {
        main: "#1B2430",
      },
      secondary: {
        main: "#272F37",
        light: "#4A525A",
      },
      error: {
        main: "#AD2323",
        contrastText: "#FFFFFF",
      },
      warning: {
        main: "#F9BB00",
        contrastText: "#FFFFFF",
      },
      success: {
        main: "#008A3A",
        contrastText: "#FFFFFF",
      },
      grey: staticThemeColors.grey,
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      fontSize: 14,
      fontWeightRegular: 400,
      fontWeightBold: 700,
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
        fontSize: "2rem",
      },
      h3: {
        fontWeight: 600,
        fontSize: "1.25rem",
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.1rem",
      },
      h5: {
        fontWeight: 600,
        fontSize: "1rem",
      },
      h6: {
        fontWeight: 600,
        fontSize: "0.95rem",
      },
    },
  })
);

export default theme;
