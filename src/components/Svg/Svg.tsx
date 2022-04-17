import { styled } from "@mui/material";
import { space } from "styled-system";

import colors from "config/theme/colors";

import { SvgProps } from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Svg = styled("svg")((props: SvgProps) => ({
  alignSelf: "center", // Safari fix
  fill: colors.textPrimary,
  flexShrink: 0,
  ...space,
}));

Svg.defaultProps = {
  color: "text",
  width: "20px",
  xmlns: "http://www.w3.org/2000/svg",
};

export default Svg;
