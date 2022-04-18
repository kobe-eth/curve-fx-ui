import React, { useEffect, useState } from "react";

import { styled } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Text } from "components/Text";
import colors from "config/theme/colors";

import tokens from "config/tokens";
import { TokenTypes } from "state/types";

interface RouteProps {
  tokenIn: string;
  tokenOut: string;
}

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  svg: {
    width: "12px",
    height: "12px",
    margin: "0px 2px 0px 2px",
  },
});

const Route: React.FC<RouteProps> = ({ tokenIn, tokenOut }) => {
  const tokenInObject = tokens.find(t => t.symbol === tokenIn)
  const tokenOutObject = tokens.find(t => t.symbol === tokenOut)

  const [route, setRoute] = useState([])

  useEffect(() => {
    if (tokenInObject.type.includes(TokenTypes.jSynth) && tokenOutObject.type.includes(TokenTypes.jSynth)) {
      setRoute([tokenIn, tokenOut])
    }
    else if (tokenInObject.pool === tokenOutObject.pool) {
      setRoute([tokenIn, tokenOut])
    }
    else if (tokenInObject.type.includes(TokenTypes.jSynth) && tokenOutObject.type.includes(TokenTypes.stablecoin)) {
      setRoute([tokenIn, tokenOutObject.jSynthAssociated, tokenOut])
    }
    else if (tokenInObject.type.includes(TokenTypes.stablecoin) && tokenOutObject.type.includes(TokenTypes.jSynth)) {
      setRoute([tokenIn, tokenInObject.jSynthAssociated, tokenOut])
    }
    else if (tokenInObject.type.includes(TokenTypes.stablecoin) && tokenOutObject.type.includes(TokenTypes.stablecoin)) {
      setRoute([tokenIn, tokenInObject.jSynthAssociated, tokenOutObject.jSynthAssociated, tokenOut])
    }
    else {
      setRoute([])
    }
  }, [tokenIn, tokenOut])

  return (
    <Container>
      <Text style={{ color: `${colors.textPrimary}50` }}>
        Route
      </Text>
      <Text style={{ color: `${colors.textPrimary}50` }}>
        {
          route.map((r, index) => {
            return (
              <>
                {r}
                {route.length !== index + 1 ? <ArrowForwardIosIcon /> : <></>}
              </>
            )
          })
        }
      </Text>
    </Container>
  );
};

export default Route;
