[![Tests Status](https://github.com/luxumbra/daoism-dapp/actions/workflows/main.yml/badge.svg)](https://github.com/luxumbra/daoism-dapp/actions/workflows/main.yml)
[![Build Status](https://github.com/luxumbra/daoism-dapp/actions/workflows/build.yml/badge.svg)](https://github.com/luxumbra/daoism-dapp/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/luxumbra/daoism-dapp/badge.svg)](https://coveralls.io/github/luxumbra/daoism-dapp)
[![Known Vulnerabilities](https://snyk.io/test/github/luxumbra/daoism-dapp/badge.svg)](https://snyk.io/test/github/luxumbra/daoism-dapp)

## The challenge

> **Daoism Systems Front-end Engineer Technical Challenge**
>
> This technical challenge will evaluate:
>
> - best practices for React
> - ability to implement web3 technologies such as calling a Solidity contract from UI or minting a token

> **Overview**
>
> The applicant will be tasked with the creation of a simple React app that connects to a Metamask wallet and calls a Solidity contract function with the help of useDapp hook.

### Requirements

- [x] a <Profile /> component should either display a wallet address and a token balance if the user is connected to the wallet, or display a "connect to wallet" button
- [x] a <Transfer /> component that contains a form with 2 inputs: "to" (address) and "amount" that allows for a token to be sent to the specified address
- [x] a <Mint /> component that contains a form with 2 inputs: "to" (address) and "amount" that allows generating tokens for the set address
- [x] https://create-react-app.dev/ may be used as a boilerplate or similar
- [x] using any CSS framework is a plus
- [x] error handling
- [ ] tests (optional, but a big plus)
- [x] any token can be used or 0x9ed2135850920ba65566d010b947b49e88651675

### Solution

Can be viewed at https://daoism.luxumbra.dev

- Project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- CSS framework used is Chakra UI
- Using Chakra UIs Toast for giving feedback to the user or logging errors to the console. Would like to hook into Sentry or HoneyBadger for catching & tracking exceptions.
- `<Mint />` & `<Transfer />` components in place with forms & validation using Formik library.
  - The token used is called dApp, on Rinkeby. I created it using [ThirdWeb](https://thirdweb.com/). Contract: [0x85DEf9F64609DF4ef0c2b88D0aEC8298C78156F9](https://rinkeby.etherscan.io/address/0x85def9f64609df4ef0c2b88d0aec8298c78156f9).
- Github actions for Continuous Integration, deploying to Fleek IPFS
- Uses `@react/testing-library and Jest - Some basic tests written
- [Coveralls](https://coveralls.io) integration - coverage of tests can be seen on the Coveralls [project page](https://coveralls.io/github/luxumbra/daoism-dapp)
- Snyk Security integration for vulnerability checking of dependencies.

### Issues I had

I have not used testing libraries before and _really_ wanted to take this opportunity to learn an important skill I have not gotten to learning yet. I ran into issues with even the simplest test not passing in most files - ~~I am pretty sure it is a typescript / jest config issue~~ I spent hours trawling SO and googling for solutions and turns out NextJS can be a pain when testing ESM. A friend took a look at my config, couldn't see any issues and suggested trying [Vite](https://vitejs.dev/). So I stripped out NextJS and the app now uses Vite with the basic tests I have added now running without issue.

Thanks for the opportunity to do this. Successful or not in my application, the process has been amazing and while trying to get some bonus points (and probably taking too long), I have fallen down a new rabbithole :rabbit: and look forward to seeing my coverage go from red to green. :green_heart:


## Getting started

First, install the things:

```bash
yarn
```

Fire up the app

```bash
yarn ui:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run build

The build runs `tsc` to lint the code before running `vite build` to bundle the app in `esm`, `cjs` & `iife` formats.
Note: The production build from Vite is taking a while for such a smol project.

```bash
yarn ui:build
```

### Happy coding

Run the linter (it runs for the previews but good to run before you make a PR)

```bash
yarn lint:scripts
yarn lint:scripts:fix
yarn format:scripts
yarn format
```

Run tests

```bash
yarn test
yarn test:watch
yarn test:coverage
```

Run pre-commit checks with Husky

```bash
yarn prepare
```

## Deployed on ~~Vercel~~ ~~Fleek~~ Netlify

All PR previews, develop & prod now deploy to [Netlify](https://netlify.com).
Once I dropped Vercel I wanted to use Fleek for the IPFS / decentralisation ascpects but a) they don't do PR previews on more than one branch and b) their service has been down for the last 18 hours, so I went to Netlify. 😅 


