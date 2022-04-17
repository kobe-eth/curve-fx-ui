import React, { useState } from "react";

import { Button } from "@mui/material";

import AccountModal from "components/Account/AccountModal";
import colors from "config/theme/colors";
import { useActiveWeb3React, useAuth } from "web3";

interface Props {
  style?: any;
}

const AccountButton: React.FC<Props> = ({ style }) => {
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const { logout } = useAuth();
  const { account } = useActiveWeb3React();
  const accountEllipsis = account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : "";

  const buttonStyle = style || {
    color: colors.textPrimary,
    backgroundColor: colors.background,
    border: `1px solid ${colors.info}`,
    borderRadius: "8px",
    minWidth: "160px",
    textTransform: "none",
  };

  return (
    <>
      <Button sx={buttonStyle} onClick={() => setOpenAccountModal(true)}>
        {accountEllipsis}
      </Button>
      <AccountModal
        logout={logout}
        open={openAccountModal}
        setOpen={setOpenAccountModal}
        onDismiss={() => setOpenAccountModal(false)}
      />
    </>
  );
};

export default AccountButton;
