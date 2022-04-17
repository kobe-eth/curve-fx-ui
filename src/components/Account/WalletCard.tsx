import React from "react";

import { Button, Typography } from "@mui/material";

import { connect } from "web3";
import { Config, Login } from "web3/config";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss }) => {
  const { title, icon: Icon } = walletConfig;

  return (
    <Button
      variant="contained"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "4px 0",
        textTransform: "none",
      }}
      onClick={() => connect(login, walletConfig, onDismiss)}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Icon width="32px" />
      <Typography variant="body2">{title}</Typography>
    </Button>
  );
};

export default WalletCard;
