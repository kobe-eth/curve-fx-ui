import React from "react";

import LinkIcon from "@mui/icons-material/Link";
import { styled } from "@mui/material";

import { Text } from "components/Text";
import colors from "config/theme/colors";

interface ToastProps {
  text: string;
  link?: string;
}

const Container = styled("div")({
  display: "flex",
});

const StyledLink = styled("a")({
  textDecoration: "none",
  color: colors.textPrimary,
  display: "flex",
  alignItems: "center",
  fontSize: "14px",

  svg: {
    paddingLeft: "4px",
    height: "14px",
    width: "auto",
    fill: colors.primary,
  },
});

const Toast: React.FC<ToastProps> = ({ text, link }) => {
  return (
    <Container>
      <Text fontSize="14px" style={{ color: colors.textPrimary }}>
        {text}
      </Text>
      {link ? (
        <>
          <Text fontSize="14px" style={{ color: colors.textPrimary }}>
            &nbsp;-&nbsp;
          </Text>
          <StyledLink href={link} target="_blank" rel="noopener noreferrer">
            View in explorer <LinkIcon />
          </StyledLink>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Toast;
