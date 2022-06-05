[![Tests Status](https://github.com/luxumbra/daoism-dapp/actions/workflows/main.yml/badge.svg)](https://github.com/luxumbra/daoism-dapp/actions/workflows/main.yml)
[![Coverage Status](https://coveralls.io/repos/github/luxumbra/daoism-dapp/badge.svg)](https://coveralls.io/github/luxumbra/daoism-dapp)
[![Known Vulnerabilities](https://snyk.io/test/github/luxumbra/daoism-dapp/badge.svg)](https://snyk.io/test/github/luxumbra/daoism-dapp)


## About the challenge
> **Daoism Systems Front-end Engineer Technical Challenge**
>
> This technical challenge will evaluate:
> - best practices for React
> - ability to implement web3 technologies such as calling a Solidity contract from UI or minting a token

> **Overview**
>
> The applicant will be tasked with the creation of a simple React app that connects to a Metamask wallet and calls a Solidity contract function with the help of useDapp hook.

## Requirements
- [X] a <Profile /> component should either display a wallet address and a token balance if the user is connected to the wallet, or display a "connect to wallet" button
- [X] a <Transfer /> component that contains a form with 2 inputs: "to" (address) and "amount" that allows for a token to be sent to the specified address
- [X] a <Mint /> component that contains a form with 2 inputs: "to" (address) and "amount" that allows generating tokens for the set address
- [X] https://create-react-app.dev/ may be used as a boilerplate or similar
- [X] using any CSS framework is a plus
- [X] error handling
- [ ] tests (optional, but a big plus)
- [X] any token can be used or 0x9ed2135850920ba65566d010b947b49e88651675

### Solution
- Project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- CSS framework used is Chakra UI
- Using Chakra UIs Toast for giving feedback to the user or logging errors to the console. Would like to hook into Sentry or HoneyBadger for catching & tracking exceptions.
- `<Mint />` & `<Transfer />` components in place with forms & validation using Formik library.
  - The token used is called dApp, on Rinkeby. I created it using [ThirdWeb](https://thirdweb.com/). Contract: [0x85DEf9F64609DF4ef0c2b88D0aEC8298C78156F9](https://rinkeby.etherscan.io/address/0x85def9f64609df4ef0c2b88d0aec8298c78156f9). To test the minting, you will need your wallet to be whitelisted and you'll need a balance to be able to use the Transfer function.
- Uses Vercel & Github actions for Continuous Integration
- Uses `@react/testing-library and Jest - *currently only using stubs for the tests but things should be correctly configured for when I get to them*
- [Coveralls](https://coveralls.io) integration - coverage of (currently non-existent) tests can be seen on the Coveralls [project page](https://coveralls.io/github/luxumbra/daoism-dapp)
- Snyk Security integration
- Set default contract for minting & transfer to WAFFLE (Rinkeby) for Daoism to test.


## Getting Started

First, install the things:

```bash
yarn
```

Fire up the app
```bash
yarn ui:dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Build the app for deployment
Good to run before you push your branch for a PR as this will lint the project, run tests and give coverage feedback before running the build.

```bash
yarn ui:build
```

### Happy coding
Run the linter (it runs for the previews but good to run before you make a PR)
```bash
yarn lint
yarn lint:fix
```

Run tests (see above)
```bash
yarn test
yarn test:watch
yarn test:coverage
```

## Deployed on Vercel
All PR previews, develop & prod deploy to [Vercel](https://vercel.com) via Github integration.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
