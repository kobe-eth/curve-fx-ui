import React, { useState } from "react";

import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import ConnectButton from "components/Account/ConnectButton";
import colors from "config/theme/colors";
import {
  useApproveIfNeeded,
  useFXEchange,
} from "hooks";
import { useAppDispatch } from "state";
import { fetchBalanceData } from "state/balance";
import { Balance } from "state/balance/types";
import { useNetworkChainId } from "state/network/hooks";
import { TradingPair } from "state/trading/types";
import { useActiveWeb3React } from "web3";
import contracts from "config/contracts";

interface ActionsButtonProps {
  tradingPair: TradingPair;
  tokenInBalance: Balance;
  tokenOutBalance: Balance;
  tokenInAmount: any;
  setTokenInAmount: (newAmount) => void;
  setTokenOutAmount: (newAmount) => void;
}

const ActionsButton: React.FC<ActionsButtonProps> = ({
  tradingPair,
  tokenInBalance,
  tokenOutBalance,
  tokenInAmount,
  setTokenInAmount,
  setTokenOutAmount,
}) => {
  const dispatch = useAppDispatch();
  const { account } = useActiveWeb3React();
  const chainId = useNetworkChainId();

  const [pendingTx, setPendingTx] = useState(false);

  const { onApproveIfNeeded } = useApproveIfNeeded(tokenInBalance.address);

  const { onExchange } = useFXEchange();

  const handleSwap = async () => {
    setPendingTx(true);
    await onApproveIfNeeded(contracts.curveRouter["137"]);
    const status = await onExchange(tokenInBalance, tokenOutBalance, tokenInAmount);
    if (status) {
      setTokenInAmount("0");
      setTokenOutAmount("0");
      dispatch(fetchBalanceData(chainId, account));
    }
    setPendingTx(false);
  };

  return (
    <>
      {account ? (
        <Button
          disabled={
            pendingTx ||
            tokenInBalance.symbol === tokenOutBalance.symbol ||
            Number(tokenInAmount) <= 0 ||
            Number(tokenInBalance.userBalance) < Number(tokenInAmount)
          }
          variant="contained"
          color="primary"
          sx={{
            color: "#000",
            backgroundColor: colors.primary,
            height: "60px",
            marginTop: tradingPair ? "20px" : "48px",
            borderRadius: "8px",
          }}
          onClick={() => handleSwap()}
        >
          {pendingTx ? (
            <CircularProgress
              color="primary"
              sx={{ height: "24px !important", width: "24px !important" }}
            />
          ) : (
            "Swap"
          )}
        </Button>
      ) : (
        <ConnectButton
          additionalStyle={{
            height: "60px",
            marginTop: tradingPair ? "20px" : "48px",
          }}
        />
      )}
    </>
  );
};

export default ActionsButton;
