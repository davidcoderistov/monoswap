## Monoswap [ec2-16-171-240-55.eu-north-1.compute.amazonaws.com:3002](http://ec2-16-171-240-55.eu-north-1.compute.amazonaws.com:3002/)

![monoswap](https://user-images.githubusercontent.com/85624034/197181924-02a8cd10-7559-4946-aebd-27d091edadf4.png)


Monoswap is a decentralized exchange (DEX) multi-chain dApp that facilitates trading of ERC20 tokens. It uses Uniswap [Token Lists](https://tokenlists.org/), a new community-led standard for creating lists of ERC20 tokens to improve discoverability and trust in ERC20 token lists in a manner that is inclusive, transparent, and decentralized. Swapping is powered by the [0x Protocol](https://www.0x.org/), an open protocol that enables the decentralized exchange of tokens on the Ethereum blockchain.

### Core features
- Connecting to [Metamask](https://metamask.io/)
- Multi-chain support: Ethereum, Polygon, Optimism, Arbitrum and Goerli
- Standardized set of ERC20 tokens using Uniswap [Token Lists](https://tokenlists.org/)
- Swapping ERC20 tokens using the [0x Protocol](https://www.0x.org/)
- View token balance
- View transactions history and transaction status

### API endpoints
- [tokens.uniswap.org](https://tokens.uniswap.org/) for getting the token lists
- [alchemy_getTokenBalances](https://docs.alchemy.com/reference/alchemy-gettokenbalances) for getting the token balances
- [/swap/v1/quote](https://0x.org/docs/0x-swap-api/api-references/get-swap-v1-quote) for getting the quote for buying or selling any ERC20 token
- [/swap/v1/price](https://0x.org/docs/0x-swap-api/api-references/get-swap-v1-price) for getting the best price for buying or selling any ERC20 token

### Using Monoswap

#### `REACT_APP_ALCHEMY_API_KEY`

Set up local environment variable by creating a .env.development.local file in the root of your project and adding your [Alchemy](https://www.alchemy.com/) API key.

#### `npm install`

Installs all packages.

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### Contributing to Monoswap

To contribute to Monoswap, follow these steps:
1. Fork this repository
2. Create a branch: `git checkout -b <branch_name>`
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin monoswap/<location>`
5. Create the pull request

Alternatively see the GitHub documentation on [creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

### Contact

If you want to contact me you can reach me at [davidcoderistov@gmail.com](mailto:davidcoderistov@gmail.com).
