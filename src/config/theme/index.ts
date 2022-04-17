import { createTheme } from "@mui/material/styles";

import colors from "./colors";

const theme = createTheme({
  typography: {
    fontFamily: ["Krub", "sans-serif"].join(","),
    fontSize: 16,
  },
  palette: {
    background: {
      default: colors.backgroundAlt,
      paper: colors.background,
    },
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    info: {
      main: colors.info,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    success: {
      main: colors.primary,
    },
    error: {
      main: colors.error,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          ":disabled": {
            backgroundColor: colors.background,
            color: colors.textSecondary,
          },
        },
        containedPrimary: {
          ":hover": {
            backgroundColor: `${colors.primary}80`,
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
