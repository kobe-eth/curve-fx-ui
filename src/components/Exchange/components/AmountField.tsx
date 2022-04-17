import React from "react";

import { Button } from "@mui/material";

import colors from "config/theme/colors";
import { TradingPair } from "state/trading/types";

import SelectToken from "./SelectToken";
import { AmountFieldContainer, AmountInput } from "./styles";

interface AmountFieldProps {
  warning: boolean;
  token: string;
  tradingPair: TradingPair;
  amount: any;
  setAmount: (newAmount) => void;
  setRelevantAmount: (newAmount) => void;
  setView: (newView) => void;
  toView: string;
  computeRelevantAmount: (amount, tradingPair) => string;
  selectMax?: () => void;
}

const AmountField: React.FC<AmountFieldProps> = ({
  warning,
  token,
  tradingPair,
  amount,
  setAmount,
  setRelevantAmount,
  setView,
  toView,
  computeRelevantAmount,
  selectMax,
}) => {
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
    setRelevantAmount(computeRelevantAmount(event.target.value, tradingPair));
  };

  return (
    <AmountFieldContainer
      sx={{ borderColor: warning ? colors.secondary : colors.info }}
    >
      <AmountInput
        type="number"
        placeholder="0"
        onWheel={(event) => (event.target as HTMLTextAreaElement).blur()}
        value={amount}
        onChange={handleChangeAmount}
        onClick={(event) => (event.target as HTMLTextAreaElement).select()}
      />
      {selectMax ? (
        <Button
          onClick={() => selectMax()}
          sx={{
            color: colors.textSecondary,
            border: `1px solid ${colors.info}`,
            borderRadius: "8px",
            height: "24px",
            mr: "8px",
            minWidth: "40px",
            fontSize: "14px",
          }}
        >
          MAX
        </Button>
      ) : (
        <></>
      )}
      <SelectToken token={token} setView={setView} toView={toView} />
    </AmountFieldContainer>
  );
};

export default AmountField;
