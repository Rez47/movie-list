import { createTheme, responsiveFontSizes } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface PaletteOptions {
    customColors: {
      gold?: string;
      trasparentGray: string;
    };
  }

  interface Palette {
    customColors: {
      gold?: string;
      trasparentGray: string;
    };
  }
}

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
      customColors: {
        gold: "#dbc323",
        trasparentGray: "rgba(67, 67, 67, 0.3)",
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
      body2: {
        color: "#c2c2c2",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            width: "100% !important",
            maxWidth: "100vw !important",
            marginLeft: "0 !important",
            marginRight: "0 !important",
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: "#FFFFFF",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#808080",
              },
              "&:hover fieldset": {
                borderColor: "#808080",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#808080",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#FFFFFF",
              "&.Mui-focused": {
                color: "#FFFFFF",
              },
            },
            "& .MuiOutlinedInput-input": {
              color: "#FFFFFF",
            },
            "& .MuiOutlinedInput-placeholder": {
              color: "#FFFFFF",
            },
          },
        },
      },
    },
  })
);

export default theme;
