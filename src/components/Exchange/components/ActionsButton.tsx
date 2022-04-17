import React, { useState } from "react";

import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { formatUnits } from "ethers/lib/utils";

import ConnectButton from "components/Account/ConnectButton";
import colors from "config/theme/colors";
import {
  useApproveIfNeeded,
  useFixedToFloating,
  useFixedUnwrap,
  useFixedWrap,
  useFloatingExchange,
  useFloatingMint,
  useFloatingRedeem,
  useFloatingToFixed,
  useUnwrapFixedTo,
  useWrapFixedFrom,
  useFXEchange,
} from "hooks";
import { useRouterAddress } from "hooks/useAddress";
import { useAppDispatch } from "state";
import { fetchBalanceData } from "state/balance";
import { Balance } from "state/balance/types";
import { useNetworkChainId } from "state/network/hooks";
import { useLpFromRegistry } from "state/registry/hooks";
import { TradingPair } from "state/trading/types";
import { TokenTypes } from "state/types";
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

  const tokenInLpFromRegistry = useLpFromRegistry(tokenInBalance);
  const tokenOutLpFromRegistry = useLpFromRegistry(tokenOutBalance);

  const { onApproveIfNeeded } = useApproveIfNeeded(tokenInBalance.address);

  const { onExchange } = useFXEchange();
  const { onFloatingMint } = useFloatingMint(tokenOutLpFromRegistry);
  const { onFloatingRedeem } = useFloatingRedeem(tokenInLpFromRegistry);
  const { onFloatingExchange } = useFloatingExchange(tokenInLpFromRegistry);

  const handleSwap = async () => {
    setPendingTx(true);
    let status = false;
    await onApproveIfNeeded(contracts.curveRouter["137"]);
    await onExchange(tokenInBalance, tokenOutBalance, tokenInAmount);
    // if (
    // tokenInBalance.type.includes(TokenTypes.collateral) &&
    // tokenOutBalance.type.includes(TokenTypes.jSynth)
    // ) {
    // await onApproveIfNeeded(tokenOutLpFromRegistry);
    // status = await onFloatingMint(tokenInAmount, tokenInBalance.decimals);
    // } else if (
    // tokenInBalance.type.includes(TokenTypes.jSynth) &&
    // tokenOutBalance.type.includes(TokenTypes.collateral)
    // ) {
    // await onApproveIfNeeded(tokenInLpFromRegistry);
    // status = await onFloatingRedeem(tokenInAmount);
    // } else if (
    // tokenInBalance.type.includes(TokenTypes.jSynth) &&
    // tokenOutBalance.type.includes(TokenTypes.jSynth)
    // ) {
    // await onApproveIfNeeded(tokenInLpFromRegistry);
    // status = await onFloatingExchange(tokenOutLpFromRegistry, tokenInAmount);
    // }
    // if (status) {
    // setTokenInAmount("0");
    // setTokenOutAmount("0");
    // dispatch(fetchBalanceData(chainId, account));
    // }
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
