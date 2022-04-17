import React from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Text } from "components/Text";

import { Image, SelectTokenContainer } from "./styles";

interface SelectTokenProps {
  token: string;
  setView: (view) => void;
  toView: string;
}

const SelectToken: React.FC<SelectTokenProps> = ({
  token,
  setView,
  toView,
}) => {
  return (
    <SelectTokenContainer onClick={() => setView(toView)}>
      <Image
        alt={`${token} logo`}
        src={`/images/tokens/${token.toLowerCase()}.svg`}
        width="20px"
        height="20px"
      />
      <Text>{token}</Text>
      <ArrowForwardIosIcon fontSize="small" sx={{ height: "12px" }} />
    </SelectTokenContainer>
  );
};

export default SelectToken;
