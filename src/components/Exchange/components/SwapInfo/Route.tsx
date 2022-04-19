import React from "react";

import { styled } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Text } from "components/Text";
import colors from "config/theme/colors";

interface RouteProps {
  route: string[];
}

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  svg: {
    width: "12px",
    height: "12px",
    margin: "0px 2px 0px 2px",
  },
});

const Route: React.FC<RouteProps> = ({ route }) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Route;
