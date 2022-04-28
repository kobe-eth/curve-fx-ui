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

    let route = [];

    if (
      (tokenInObject.type.includes(TokenTypes.collateral) &&
        tokenOutObject.type.includes(TokenTypes.jSynth)) ||
      (tokenInObject.type.includes(TokenTypes.jSynth) &&
        tokenOutObject.type.includes(TokenTypes.collateral)) ||
      (tokenInObject.type.includes(TokenTypes.jSynth) &&
        tokenOutObject.type.includes(TokenTypes.jSynth)) ||
      (tokenOutObject.type.includes(TokenTypes.metapool) &&
        tokenInObject.type.includes(TokenTypes.metapool))
    ) {
      route = [tokenIn, tokenOut];
      if (
        (tokenInObject.type.includes(TokenTypes.metapool) &&
          !tokenOutObject.type.includes(TokenTypes.metapool)) ||
        (tokenOutObject.type.includes(TokenTypes.metapool) &&
          !tokenInObject.type.includes(TokenTypes.metapool))
      ) {
        route = [tokenIn, "USDC", tokenOut];
      }
    } else if (
      (tokenInObject.type.includes(TokenTypes.jSynth) &&
        tokenOutObject.type.includes(TokenTypes.stablecoin)) ||
      (tokenInObject.type.includes(TokenTypes.collateral) &&
        tokenOutObject.type.includes(TokenTypes.stablecoin))
    ) {
      route = [tokenIn, tokenOutObject.jSynthAssociated, tokenOut];
      if (tokenInObject.type.includes(TokenTypes.metapool)) {
        route = [tokenIn, "USDC", tokenOutObject.jSynthAssociated, tokenOut];
      } else if (tokenOutObject.type.includes(TokenTypes.metapool)) {
        route = [tokenIn, tokenOutObject.jSynthAssociated, "USDC", tokenOut];
      }
    } else if (
      (tokenInObject.type.includes(TokenTypes.stablecoin) &&
        tokenOutObject.type.includes(TokenTypes.jSynth)) ||
      (tokenInObject.type.includes(TokenTypes.stablecoin) &&
        tokenOutObject.type.includes(TokenTypes.collateral))
    ) {
      route = [tokenIn, tokenInObject.jSynthAssociated, tokenOut];
      if (tokenInObject.type.includes(TokenTypes.metapool)) {
        route = [tokenIn, "USDC", tokenInObject.jSynthAssociated, tokenOut];
      } else if (tokenOutObject.type.includes(TokenTypes.metapool)) {
        route = [tokenIn, tokenInObject.jSynthAssociated, "USDC", tokenOut];
      }
    } else if (
      tokenInObject.type.includes(TokenTypes.stablecoin) &&
      tokenOutObject.type.includes(TokenTypes.stablecoin)
    ) {
      route = [
        tokenIn,
        tokenInObject.jSynthAssociated,
        tokenOutObject.jSynthAssociated,
        tokenOut,
      ];
      if (tokenInObject.type.includes(TokenTypes.metapool)) {
        route = [
          tokenIn,
          "USDC",
          tokenInObject.jSynthAssociated,
          tokenOutObject.jSynthAssociated,
          tokenOut,
        ];
      } else if (tokenOutObject.type.includes(TokenTypes.metapool)) {
        route = [
          tokenIn,
          tokenInObject.jSynthAssociated,
          tokenOutObject.jSynthAssociated,
          "USDC",
          tokenOut,
        ];
      }
    } else {
    }

    route = [...new Set(route)];
    setRoute(route);
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
