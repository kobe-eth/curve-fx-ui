import React, { useEffect, useState } from "react";

import { formatUnits } from "ethers/lib/utils";

import { useBalanceFromSymbol } from "state/balance/hooks";
import { usePairsAndRoutesFromSymbol } from "state/trading/hooks";
import { getAmountIn, getAmountOut } from "utils/getAmount";

import ActionsButton from "./components/ActionsButton";
import AmountField from "./components/AmountField";
import Balance from "./components/Balance";
import ReverseToken from "./components/ReverseToken";
import { ExchangeBody } from "./components/styles";
import TradingRate from "./components/TradingRate";

interface Props {
  tokenIn: string;
  tokenOut: string;
  tokenInAmount: string;
  tokenOutAmount: string;
  setTokenInAmount: (amount: string) => void;
  setTokenOutAmount: (amount: string) => void;
  setView: (view: string) => void;
  handleReverseToken: () => void;
}

const Swap: React.FC<Props> = ({
  tokenIn,
  tokenOut,
  tokenInAmount,
  tokenOutAmount,
  setTokenInAmount,
  setTokenOutAmount,
  handleReverseToken,
  setView,
}) => {
  const [warning, setWarning] = useState(false);
  const tokenInBalance = useBalanceFromSymbol(tokenIn);
  const tokenOutBalance = useBalanceFromSymbol(tokenOut);
  const tradingPair = usePairsAndRoutesFromSymbol(tokenIn, tokenOut);

  const handleSelectMax = () => {
    setTokenInAmount(
      formatUnits(tokenInBalance.userBalance, tokenInBalance.decimals)
    );

    setTokenOutAmount(
      getAmountOut(
        Number(
          formatUnits(tokenInBalance.userBalance, tokenInBalance.decimals)
        ),
        tradingPair
      )
    );
  };

  useEffect(() => {
    setTokenOutAmount(getAmountOut(Number(tokenInAmount), tradingPair));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTokenOutAmount, tradingPair]);

  useEffect(() => {
    if (tokenInBalance) {
      setWarning(
        Number(
          formatUnits(tokenInBalance.userBalance, tokenInBalance.decimals)
        ) < Number(tokenInAmount)
      );
    }
  }, [tokenInBalance, tokenInAmount]);

  return (
    <>
      <ExchangeBody sx={{ padding: "32px 16px 16px" }}>
        <Balance label="You swap" balance={tokenInBalance} warning={warning} />
        <AmountField
          warning={warning}
          token={tokenIn}
          tradingPair={tradingPair}
          amount={tokenInAmount}
          setAmount={setTokenInAmount}
          setRelevantAmount={setTokenOutAmount}
          setView={setView}
          toView={"CHOOSE_ASSET_0"}
          computeRelevantAmount={getAmountOut}
          selectMax={handleSelectMax}
        />
        <ReverseToken handleReverseToken={handleReverseToken} />
        <Balance label="For" balance={tokenOutBalance} />
        <AmountField
          warning={warning}
          token={tokenOut}
          tradingPair={tradingPair}
          amount={tokenOutAmount}
          setAmount={setTokenOutAmount}
          setRelevantAmount={setTokenInAmount}
          setView={setView}
          toView={"CHOOSE_ASSET_1"}
          computeRelevantAmount={getAmountIn}
        />
        <TradingRate tradingPair={tradingPair} />
        <ActionsButton
          tradingPair={tradingPair}
          tokenInBalance={tokenInBalance}
          tokenOutBalance={tokenOutBalance}
          tokenInAmount={tokenInAmount}
          setTokenInAmount={setTokenInAmount}
          setTokenOutAmount={setTokenOutAmount}
        />
      </ExchangeBody>
    </>
  );
};

export default Swap;
