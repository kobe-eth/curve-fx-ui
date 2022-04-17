import React, { useState } from "react";

import { Button } from "@mui/material";

import { ConnectModal } from "components";
import colors from "config/theme/colors";
import { useAuth } from "web3";

interface Props {
  style?: any;
  additionalStyle?: any;
}

const ConnectButton: React.FC<Props> = ({ style, additionalStyle }) => {
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const { login } = useAuth();

  const buttonStyle = style || {
    color: "#000",
    backgroundColor: colors.primary,
    borderRadius: "8px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: colors.primary,
    },
    ...additionalStyle,
  };

  return (
    <>
      <Button sx={buttonStyle} onClick={() => setOpenConnectModal(true)}>
        Sign in
      </Button>
      <ConnectModal
        login={login}
        open={openConnectModal}
        setOpen={setOpenConnectModal}
        onDismiss={() => setOpenConnectModal(false)}
      />
    </>
  );
};

export default ConnectButton;
