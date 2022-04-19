import { styled } from "@mui/material";

import colors from "config/theme/colors";

export const Flex = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
});

export const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "360px",
  borderRadius: "8px",
  boxShadow: `0px 8px 16px 4px ${colors.primary}50`,
});

export const ExchangeHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  height: "60px",
  width: "100%",
  padding: "16px",
  borderRadius: "8px 8px 0 0",
  backgroundColor: colors.background,
});

export const ExchangeBody = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "368px",
  overflowX: "scroll",
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
});

export const AmountFieldContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
  height: "60px",
  border: `1px solid ${colors.info}`,
  padding: "0 8px",
});

export const AmountInput = styled("input")({
  height: "60px",
  width: "100%",
  backgroundColor: "transparent",
  border: "none",
  fontSize: "18px",
  color: colors.textSecondary,
  "&:focus-visible": {
    outline: "none",
  },
});

export const SelectTokenContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

export const Image = styled("img")({
  marginRight: "6px",
});