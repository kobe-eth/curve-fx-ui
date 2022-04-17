import React from "react";

import { Button, styled } from "@mui/material";

import AccountButton from "components/Account/AccountButton";
import ConnectButton from "components/Account/ConnectButton";
import colors from "config/theme/colors";
import { useActiveWeb3React } from "web3";

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "90px",
  width: "100%",
});

const Wrapper = styled("div")({
  display: "flex",
  width: "fit-content",
});

const Image = styled("img")({
  width: "32px",
  height: "32px",
});

const Header: React.FC = () => {
  const { account } = useActiveWeb3React();

  const userButtonStyle = {
    color: colors.textPrimary,
    backgroundColor: colors.background,
    border: `1px solid ${colors.info}`,
    borderRadius: "8px",
    minWidth: "160px",
    textTransform: "none",
  };

  return (
    <Container>
      <Image alt="jarvis logo" src="/images/logo.svg" />
      <Wrapper>
        {account ? (
          <AccountButton style={userButtonStyle} />
        ) : (
          <ConnectButton style={userButtonStyle} />
        )}
        <Button
          href="https://help.jarvis.exchange/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: colors.textPrimary,
            backgroundColor: colors.background,
            border: `1px solid ${colors.info}`,
            borderRadius: "8px",
            minWidth: "42px",
            textTransform: "none",
            ml: "8px",
          }}
        >
          ?
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Header;
