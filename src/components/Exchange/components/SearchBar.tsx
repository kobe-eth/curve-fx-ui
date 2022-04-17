import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, styled } from "@mui/material";

import colors from "config/theme/colors";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (newSearchValue) => void;
  view: string;
  setView: (view) => void;
}

const SearchContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  height: "60px",
  width: "100%",
  padding: "16px",
  color: colors.textSecondary,
  borderTop: `1px solid ${colors.info}`,
  borderBottom: `1px solid ${colors.info}`,
});

const Search = styled("input")({
  height: "100%",
  width: "100%",
  backgroundColor: "transparent",
  border: "none",
  fontSize: "16px",
  color: colors.textSecondary,
  "&:focus-visible": {
    outline: "none",
  },
});

const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  setSearchValue,
  view,
  setView,
}) => {
  const handleChange = (event) => {
    setSearchValue(event.target.value);
    if (view === "SWAP" || view === "TRADING_PAIR_LIST") {
      if (event.target.value === "") {
        setView("SWAP");
      } else {
        setView("TRADING_PAIR_LIST");
      }
    }
  };

  const handleReset = () => {
    setSearchValue("");
    if (view === "TRADING_PAIR_LIST") {
      setView("SWAP");
    }
  };

  return (
    <SearchContainer>
      <SearchIcon fontSize="small" sx={{ marginRight: "8px" }} />
      <Search
        placeholder='Try "jEUR"'
        value={searchValue}
        onChange={handleChange}
      />
      {searchValue ? (
        <IconButton
          sx={{ svg: { width: "15px" }, color: colors.textSecondary }}
          edge="end"
          onClick={() => handleReset()}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      ) : (
        <></>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
