import React from "react";

import SwapVertIcon from "@mui/icons-material/SwapVert";

import colors from "config/theme/colors";

interface ReverseTokenProps {
  handleReverseToken: () => void;
}

const ReverseToken: React.FC<ReverseTokenProps> = ({ handleReverseToken }) => {
  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <SwapVertIcon
        fontSize="small"
        onClick={() => handleReverseToken()}
        sx={{
          color: colors.textSecondary,
          marginTop: "16px",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default ReverseToken;
