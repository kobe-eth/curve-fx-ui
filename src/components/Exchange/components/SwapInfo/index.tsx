import React, { useEffect, useState } from "react";

import { styled } from "@mui/material";

import tokens from "config/tokens";
import { TokenTypes } from "state/types";

import { Wrapper } from "../styles";
import ProtocolFees from "./ProtocolFees";
import Route from "./Route";

interface SwapInfoProps {
  tokenIn: string;
  tokenOut: string;
  tokenInAmount: any;
}

export const Container = styled(Wrapper)({
  flexDirection: "column",
  marginTop: "24px",
  padding: "16px",
  svg: {
    width: "12px",
    height: "12px",
    margin: "0px 2px 0px 2px",
  },
});

const SwapInfo: React.FC<SwapInfoProps> = ({
  tokenIn,
  tokenOut,
  tokenInAmount,
}) => {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const tokenInObject = tokens.find((t) => t.symbol === tokenIn);
    const tokenOutObject = tokens.find((t) => t.symbol === tokenOut);

    if (
      tokenInObject.type.includes(TokenTypes.jSynth) &&
      tokenOutObject.type.includes(TokenTypes.jSynth)
    ) {
      setRoute([tokenIn, tokenOut]);
    } else if (tokenInObject.pool === tokenOutObject.pool) {
      setRoute([tokenIn, tokenOut]);
    } else if (
      tokenInObject.type.includes(TokenTypes.jSynth) &&
      tokenOutObject.type.includes(TokenTypes.stablecoin)
    ) {
      setRoute([tokenIn, tokenOutObject.jSynthAssociated, tokenOut]);
    } else if (
      tokenInObject.type.includes(TokenTypes.stablecoin) &&
      tokenOutObject.type.includes(TokenTypes.jSynth)
    ) {
      setRoute([tokenIn, tokenInObject.jSynthAssociated, tokenOut]);
    } else if (
      tokenInObject.type.includes(TokenTypes.stablecoin) &&
      tokenOutObject.type.includes(TokenTypes.stablecoin)
    ) {
      setRoute([
        tokenIn,
        tokenInObject.jSynthAssociated,
        tokenOutObject.jSynthAssociated,
        tokenOut,
      ]);
    } else {
      setRoute([]);
    }
  }, [tokenIn, tokenOut]);

  return (
    <Container>
      <ProtocolFees
        route={route}
        tokenIn={tokenIn}
        tokenOut={tokenOut}
        tokenInAmount={tokenInAmount}
      />
      <Route route={route} />
    </Container>
  );
};

export default SwapInfo;
