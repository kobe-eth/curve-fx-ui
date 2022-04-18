import React from "react";

import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { styled, Tooltip } from "@mui/material";

import { Text } from "components/Text";
import { JARVIS_SWAP_FEES } from "config";
import colors from "config/theme/colors";
import { format } from "utils/number";
import { useUsdPricesFromSymbol } from "state/trading/hooks";

interface ProtocolFeesProps {
  tokenIn: string;
  tokenOut: string;
  tokenInAmount: any;
}

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  svg: {
    width: "16px",
    height: "16px",
    margin: "0px 0px -2px 4px",
  },
});

const ProtocolFees: React.FC<ProtocolFeesProps> = ({
  tokenIn,
  tokenInAmount,
}) => {
  const usdPrice = useUsdPricesFromSymbol(tokenIn).usdPrice

  return (
    <>
      {Number(tokenInAmount) > 0 ? (
        <Container>
          <Text style={{ color: `${colors.textPrimary}50` }}>
            Jarvis fees
            <Tooltip
              title="A 0.10% provider fee is collected and split between Liquidity Provider and the protocol treasury"
              arrow
              placement="top"
            >
              <HelpOutlineOutlinedIcon />
            </Tooltip>
          </Text>
          <Text style={{ color: `${colors.textPrimary}50` }}>
            {format(Number(tokenInAmount) * JARVIS_SWAP_FEES * usdPrice, 0)} USDC
          </Text>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProtocolFees;
