import styled from "@emotion/styled";
import { space, typography } from "styled-system";

import colors from "config/theme/colors";

import { TextProps } from "./types";

const getFontSize = ({ fontSize, small }: TextProps) =>
  small ? "14px" : fontSize || "16px";

const Text = styled.div<TextProps>`
  color: ${colors.textPrimary};
  font-size: ${getFontSize};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  line-height: 1.5;
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${space}
  ${typography}
`;
Text.defaultProps = {
  color: "text",
  small: false,
};

export default Text;
