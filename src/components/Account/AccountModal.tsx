import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import { Button, Fade, Modal, styled } from "@mui/material";

import { Text } from "components/Text";
import colors from "config/theme/colors";
import { useActiveWeb3React } from "web3";
import { BLOCK_EXPLORER, connectorLocalStorageKey } from "web3/config";

import UserToken from "./UserToken";

interface Props {
  logout: any;
  open: boolean;
  setOpen: (newOpen) => void;
  onDismiss?: () => void;
}

const ModalContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "90%",
  margin: "auto auto",
  backgroundColor: colors.backgroundAlt,
  borderRadius: "8px",

  [theme.breakpoints.up("sm")]: {
    width: "440px",
  },
}));

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

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "24px 24px 0",
  width: "100%",
});

const AccountModal: React.FC<Props> = ({
  open,
  setOpen,
  logout,
  onDismiss = () => null,
}) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);
  const { chainId, account } = useActiveWeb3React();

  const handleClose = () => {
    setOpen(false);
  };

  const copyToClipboardWithCommand = (content: string) => {
    const el = document.createElement("textarea");
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const displayTooltip = () => {
    setIsTooltipDisplayed(true);
    setTimeout(() => {
      setIsTooltipDisplayed(false);
    }, 3000);
  };

  return (
    <Modal
      style={{ display: "flex" }}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ModalContainer>
          <Wrapper>
            <Text fontSize="24px">Your Account</Text>
            <CloseIcon
              fontSize="small"
              onClick={handleClose}
              sx={{ cursor: "pointer" }}
            />
          </Wrapper>
          <Wrapper>
            <Text
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {account}
            </Text>
          </Wrapper>
          <Wrapper>
            <StyledLink
              href={`${BLOCK_EXPLORER[chainId]}/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View in explorer <LinkIcon />
            </StyledLink>
            <Button
              sx={{
                textTransform: "none",
                fontSize: "14px",
                width: "112px",
              }}
              onClick={() => {
                if (navigator.clipboard && navigator.permissions) {
                  navigator.clipboard
                    .writeText(account)
                    .then(() => displayTooltip());
                } else if (document.queryCommandSupported("copy")) {
                  copyToClipboardWithCommand(account);
                  displayTooltip();
                }
              }}
            >
              {isTooltipDisplayed ? "Copied!" : "Copy Address"}
            </Button>
          </Wrapper>
          <UserToken />
          <Button
            sx={{
              textTransform: "none",
              width: "100%",
              padding: "12px",
            }}
            onClick={() => {
              if (typeof window !== "undefined") {
                logout();
                window.localStorage.removeItem(connectorLocalStorageKey);
                onDismiss();
              }
            }}
          >
            Logout
          </Button>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default AccountModal;
