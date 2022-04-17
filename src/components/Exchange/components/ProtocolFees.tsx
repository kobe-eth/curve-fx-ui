import React from "react";

import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { styled, Tooltip } from "@mui/material";

import { Text } from "components/Text";
import { SWAP_FEES } from "config";
import colors from "config/theme/colors";
import { useBalanceFromSymbol } from "state/balance/hooks";
import { TokenTypes } from "state/types";
import { format } from "utils/number";

import { Wrapper } from "./styles";

interface ProtocolFeesProps {
  tokenIn: string;
  tokenOut: string;
  tokenInAmount: any;
}

const Container = styled(Wrapper)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "24px",
  padding: "16px",
  svg: {
    width: "16px",
    height: "16px",
    margin: "0px 0px -2px 4px",
  },
});

const ProtocolFees: React.FC<ProtocolFeesProps> = ({
  tokenIn,
  tokenOut,
  tokenInAmount,
}) => {
  const tokenInBalance = useBalanceFromSymbol(tokenIn);
  const tokenOutBalance = useBalanceFromSymbol(tokenOut);

  return (
    <>
      {(tokenInBalance.type.includes(TokenTypes.pegSynth) &&
        tokenOutBalance.type.includes(TokenTypes.fixedRate)) ||
      (tokenInBalance.type.includes(TokenTypes.fixedRate) &&
        tokenOutBalance.type.includes(TokenTypes.pegSynth)) ? (
        <></>
      ) : Number(tokenInAmount) > 0 ? (
        <Container>
          <Text style={{ color: `${colors.textPrimary}50` }}>
            Protocol fees
            <Tooltip
              title="A 0.15% provider fee is collected and split between Liquidity Provider and the protocol treasury"
              arrow
              placement="top"
            >
              <HelpOutlineOutlinedIcon />
            </Tooltip>
          </Text>
          <Text style={{ color: `${colors.textPrimary}50` }}>
            {format(Number(tokenInAmount) * SWAP_FEES, 0)} {tokenIn}
          </Text>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProtocolFees;
