import React, { useEffect, useState } from "react";

import { styled } from "@mui/material";

import tokens from "config/tokens";
import { Token, TokenTypes } from "state/types";

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

const buildRoute = (tokenIn: Token, tokenOut: Token) => {
  const collateral = tokens.find((t) => t.type.includes(TokenTypes.collateral));
  const fromTypes = tokenIn.type;
  const toTypes = tokenOut.type;

  let route = [tokenIn.symbol, tokenOut.symbol];
  // jSynth
  if (fromTypes.includes(TokenTypes.jSynth)) {
    if (toTypes.includes(TokenTypes.metapool)) {
      route = [tokenIn.symbol, collateral.symbol, tokenOut.symbol];
    } else if (!toTypes.includes(TokenTypes.jSynth)) {
      route = [tokenIn.symbol, tokenOut.jSynthAssociated, tokenOut.symbol];
    }
  }
  // Collateral
  else if (fromTypes.includes(TokenTypes.collateral)) {
    if (toTypes.includes(TokenTypes.metapool)) {
      route = [tokenIn.symbol, collateral.symbol, tokenOut.symbol];
    } else if (!toTypes.includes(TokenTypes.jSynth)) {
      route = [
        tokenIn.symbol,
        collateral.symbol,
        tokenOut.jSynthAssociated,
        tokenOut.symbol,
      ];
    }
  } else if (fromTypes.includes(TokenTypes.metapool)) {
    if (toTypes.includes(TokenTypes.jSynth)) {
      route = [tokenIn.symbol, collateral.symbol, tokenOut.symbol];
    } else if (!toTypes.includes(TokenTypes.metapool)) {
      route = [
        tokenIn.symbol,
        collateral.symbol,
        tokenOut.jSynthAssociated,
        tokenOut.symbol,
      ];
    }
  } else {
    if (toTypes.includes(TokenTypes.metapool)) {
      route = [
        tokenIn.symbol,
        tokenIn.jSynthAssociated,
        collateral.symbol,
        tokenOut.symbol,
      ];
    } else if (toTypes.includes(TokenTypes.collateral)) {
      route = [tokenIn.symbol, tokenIn.jSynthAssociated, tokenOut.symbol];
    }
  }

  route = [...new Set(route)];
  return route;
};

const SwapInfo: React.FC<SwapInfoProps> = ({
  tokenIn,
  tokenOut,
  tokenInAmount,
}) => {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const tokenInObject = tokens.find((t) => t.symbol === tokenIn);
    const tokenOutObject = tokens.find((t) => t.symbol === tokenOut);
    const route = buildRoute(tokenInObject, tokenOutObject);
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
