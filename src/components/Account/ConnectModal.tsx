import React from "react";

import { Backdrop, Fade, Modal, styled } from "@mui/material";

import colors from "config/theme/colors";
import { connectors, Login } from "web3/config";

import WalletCard from "./WalletCard";

interface Props {
  login: Login;
  open: boolean;
  setOpen: (newOpen) => void;
  onDismiss?: () => void;
}

const ModalContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "90%",
  margin: "auto auto",
  backgroundColor: colors.backgroundAlt,
  borderRadius: "8px",
  padding: "8px",

  [theme.breakpoints.up("sm")]: {
    width: "324px",
  },
}));

const WalletWrapper = styled("div")({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr",
});

const ConnectModal: React.FC<Props> = ({
  open,
  setOpen,
  login,
  onDismiss = () => null,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      style={{ display: "flex" }}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ModalContainer>
          <WalletWrapper>
            {connectors.map((wallet) => (
              <WalletCard
                key={wallet.title}
                walletConfig={wallet}
                login={login}
                onDismiss={onDismiss}
              />
            ))}
          </WalletWrapper>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default ConnectModal;
