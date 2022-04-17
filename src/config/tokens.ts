import { Token, TokenTypes } from "state/types";

const tokens: Token[] = [
  // SynthetiX
  {
    symbol: "jEUR",
    address: "0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
    type: [TokenTypes.jSynth],
    decimals: 18,
    derivative: "0x0Fa1A6b68bE5dD9132A09286a166d75480BE9165",
    pool: "0xCbbA8c0645ffb8aA6ec868f6F5858F2b0eAe34DA",
  },
  {
    symbol: "jSGD",
    address: "0xa926db7a4CC0cb1736D5ac60495ca8Eb7214B503",
    type: [TokenTypes.jSynth],
    derivative: "0xb6C683B89228455B15cF1b2491cC22b529cdf2c4",
    decimals: 18,
    pool: "0x91436EB8038ecc12c60EE79Dfe011EdBe0e6C777",
  },
  {
    symbol: "jCAD",
    address: "0x8ca194A3b22077359b5732DE53373D4afC11DeE3",
    type: [TokenTypes.jSynth],
    derivative: "0x606Ac601324e894DC20e0aC9698cCAf180960456",
    decimals: 18,
    pool: "0x09757F36838AAACD47DF9de4D3f0AdD57513531f",
  },
  {
    symbol: "jJPY",
    address: "0x8343091F2499FD4b6174A46D067A920a3b851FF9",
    type: [TokenTypes.jSynth],
    decimals: 18,
    derivative: "0x2076648e2D9d452D55f4252CBa9b162A1850Db48",
    pool: "0x6cA82a7E54053B102e7eC452788cC19204e831de",
  },

  // Stablecoins
  {
    symbol: "EURS",
    address: "0xE111178A87A3BFf0c8d18DECBa5798827539Ae99",
    decimals: 2,
    type: [TokenTypes.stablecoin],
    jSynthAssociated: "jEUR",
  },
  {
    symbol: "CADC",
    address: "0x5d146d8B1dACb1EBBA5cb005ae1059DA8a1FbF57",
    decimals: 18,
    type: [TokenTypes.stablecoin],
    jSynthAssociated: "jCAD",
  },
  {
    symbol: "PAR",
    address: "0xE2Aa7db6dA1dAE97C5f5C6914d285fBfCC32A128",
    decimals: 18,
    type: [TokenTypes.stablecoin],
    jSynthAssociated: "jEUR",
  },
  {
    symbol: "EURT",
    address: "0x7BDF330f423Ea880FF95fC41A280fD5eCFD3D09f",
    decimals :6,
    type: [TokenTypes.stablecoin],
    jSynthAssociated: "jEUR",
  },
  {
    symbol: "JPYC",
    address: "0x6AE7Dfc73E0dDE2aa99ac063DcF7e8A63265108c",
    decimals : 18,
    type: [TokenTypes.stablecoin],
    jSynthAssociated: "jJPY",
  },
  {
    symbol: "XSGD",
    address: "0x769434dcA303597C8fc4997Bf3DAB233e961Eda2",
    decimals : 6,
    type: [TokenTypes.stablecoin],
    jSynthAssociated: "jSGD",
  },
];

export default tokens;
