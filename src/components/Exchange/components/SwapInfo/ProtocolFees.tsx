import React, { useEffect, useState } from "react";

import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { styled, Tooltip } from "@mui/material";

import { Text } from "components/Text";
import { CURVE_SWAP_FEES, JARVIS_SWAP_FEES } from "config";
import colors from "config/theme/colors";
import tokens from "config/tokens";
import { useUsdPrices } from "state/trading/hooks";
import { TokenTypes } from "state/types";
import { format } from "utils/number";

interface ProtocolFeesProps {
  route: string[];
  tokenIn: string;
  tokenOut: string;
  tokenInAmount: any;
}

const Wrapper = styled("div")({
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
  route,
  tokenIn,
  tokenOut,
  tokenInAmount,
}) => {
  const [feesPath, setFeesPath] = useState([]);
  const [jarvisFee, setJarvisFee] = useState(0);
  const [curveFee, setCurveFee] = useState(0);

  const prices = useUsdPrices();

  useEffect(() => {
    const tokenInObject = tokens.find((t) => t.symbol === tokenIn);
    const tokenOutObject = tokens.find((t) => t.symbol === tokenOut);

    if (
      tokenInObject.type.includes(TokenTypes.jSynth) &&
      tokenOutObject.type.includes(TokenTypes.jSynth)
    ) {
      setFeesPath([JARVIS_SWAP_FEES]);
    } else if (tokenInObject.pool === tokenOutObject.pool) {
      setFeesPath([CURVE_SWAP_FEES]);
    } else if (
      tokenInObject.type.includes(TokenTypes.jSynth) &&
      tokenOutObject.type.includes(TokenTypes.stablecoin)
    ) {
      setFeesPath([JARVIS_SWAP_FEES, CURVE_SWAP_FEES]);
    } else if (
      tokenInObject.type.includes(TokenTypes.stablecoin) &&
      tokenOutObject.type.includes(TokenTypes.jSynth)
    ) {
      setFeesPath([CURVE_SWAP_FEES, JARVIS_SWAP_FEES]);
    } else if (
      tokenInObject.type.includes(TokenTypes.stablecoin) &&
      tokenOutObject.type.includes(TokenTypes.stablecoin)
    ) {
      setFeesPath([CURVE_SWAP_FEES, JARVIS_SWAP_FEES, CURVE_SWAP_FEES]);
    } else {
      setFeesPath([]);
    }
  }, [tokenIn, tokenOut]);

  useEffect(() => {
    let amountIn = tokenInAmount;
    let newJarvisFee = 0;
    let newCurveFee = 0;
    feesPath.forEach((element, index) => {
      const usdPrice =
        prices.length > 0
          ? prices.find((p) => p.symbol === route[index]).usdPrice
          : 0;
      switch (element) {
        case JARVIS_SWAP_FEES:
          newJarvisFee =
            newJarvisFee + Number(amountIn) * JARVIS_SWAP_FEES * usdPrice;
          amountIn = Number(amountIn) - Number(amountIn) * JARVIS_SWAP_FEES;
          setJarvisFee(newJarvisFee);
          break;
        case CURVE_SWAP_FEES:
          newCurveFee = newCurveFee + Number(amountIn) * CURVE_SWAP_FEES;
          amountIn = Number(amountIn) - Number(amountIn) * CURVE_SWAP_FEES;
          setCurveFee(newCurveFee);
          break;
      }
    });
  }, [feesPath, tokenInAmount, prices, route]);

  return (
    <>
      {Number(tokenInAmount) > 0 ? (
        <>
          {feesPath.includes(JARVIS_SWAP_FEES) ? (
            <Wrapper>
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
                {format(jarvisFee, 0)} USDC
              </Text>
            </Wrapper>
          ) : (
            <></>
          )}
          {feesPath.includes(CURVE_SWAP_FEES) ? (
            <Wrapper>
              <Text style={{ color: `${colors.textPrimary}50` }}>
                Curve fees
              </Text>
              <Text style={{ color: `${colors.textPrimary}50` }}>
                {format(curveFee, 0)} {tokenIn}
              </Text>
            </Wrapper>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProtocolFees;
