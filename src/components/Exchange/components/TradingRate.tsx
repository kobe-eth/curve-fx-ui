import React, { useEffect, useState } from "react";

import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import { Text } from "components/Text";
import colors from "config/theme/colors";
import { TradingPair } from "state/trading/types";
import { format } from "utils/number";

interface TradingRateProps {
  tradingPair: TradingPair;
}

const TradingRate: React.FC<TradingRateProps> = ({ tradingPair }) => {
  const [reverseRate, setReverseRate] = useState(false);
  const [displayRate, setDisplayRate] = useState("");

  useEffect(() => {
    if (tradingPair) {
      if (reverseRate) {
        setDisplayRate(
          `${format(1 / tradingPair.rate, 0, 5)} ${
            tradingPair.token0.symbol
          } per ${tradingPair.token1.symbol}`
        );
      } else {
        setDisplayRate(
          `${format(tradingPair.rate, 0, 5)} ${tradingPair.token1.symbol} per ${
            tradingPair.token0.symbol
          }`
        );
      }
    }
  }, [tradingPair, reverseRate]);

  return (
    <>
      {tradingPair ? (
        <Text
          textAlign="right"
          mt="4px"
          style={{ color: colors.textSecondary }}
        >
          {displayRate}
          <SwapHorizIcon
            onClick={() => setReverseRate(!reverseRate)}
            sx={{
              height: "16px",
              marginBottom: "-2px",
              color: colors.textSecondary,
              cursor: "pointer",
            }}
          />
        </Text>
      ) : (
        <></>
      )}
    </>
  );
};

export default TradingRate;
