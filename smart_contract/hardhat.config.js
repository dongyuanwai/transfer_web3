require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
console.log()
// https://eth-sepolia.g.alchemy.com/v2/xwtZm8Z4Thh7O6Y4dd8kJHt1A9ebZnmG
module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/xwtZm8Z4Thh7O6Y4dd8kJHt1A9ebZnmG',
      accounts: [process.env.ACCOUNT_KEY],
    },
  },
};