require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });

module.exports = {
  solidity: "0.8.9",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org", 
      accounts: [process.env.PRIVATE_KEY],
      chainId: 44787,
    },
  },
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
}
};