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
- [ ] a <Transfer /> component that contains a form with 2 inputs: "to" (address) and "amount" that allows for a token to be sent to the specified address
- [ ] a <Mint /> component that contains a form with 2 inputs: "to" (address) and "amount" that allows generating tokens for the set address
- [X] https://create-react-app.dev/ may be used as a boilerplate or similar
- [X] using any CSS framework is a plus
- [ ] error handling
- [ ] tests (optional, but a big plus)
- [X] any token can be used or 0x9ed2135850920ba65566d010b947b49e88651675

### Solution
- Project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- CSS framework used is Chakra UI
- Using Chakra UIs Toast for giving feedback to the user or logging errors to the console. Would like to hook into Sentry or HoneyBadger for catching & tracking exceptions.
- `<Mint />` & `<Transfer />` components in place with forms & validation using Formik library. Some error handling on the forms. Transfer / Mint functions still to do + write tests
- Uses Vercel & Github actions for Continuous Integration
- Uses `@react/testing-library and Jest - currently only using stubs for the tests but things should be correctly configured for when I get to them)
- [Coveralls] integration - coverage of tests can be seen on the Coveralls [project page](https://coveralls.io/github/luxumbra/daoism-dapp)
- Snyk Security integration
- Set default contract for minting & transfer to WAFFLE (Rinkeby) for Daoism to test.


## Getting Started

First, install the things:

```bash
yarn
```

Fire up the app
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Build the app for deployment (good to run before you push your branch for a PR)
```bash
yarn build
```

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
