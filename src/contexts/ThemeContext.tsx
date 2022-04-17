import React, { useState } from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import theme from "config/theme";

const CACHE_KEY = "DARK_MODE";

const ThemeContext = React.createContext({
  darkMode: null,
  toggleTheme: () => null,
});

const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const darkModeUserSetting = localStorage.getItem(CACHE_KEY);
      return darkModeUserSetting ? JSON.parse(darkModeUserSetting) : true;
    }
  });

  const toggleTheme = () => {
    setDarkMode((prevState) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState));
        return !prevState;
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={darkMode ? theme : theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
