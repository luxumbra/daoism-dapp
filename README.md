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
- Formik library used for forms & validation
- Uses Vercel & Github actions for Continuous Integration
- Uses `@react/testing-library and Jest - currently only using stubs for the tests but things should be correctly configured for when I get to them)
- Coverage of tests hooked into ['Coveralls'](https://coveralls.io/)
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


Build the app for deployment
```bash
yarn build
```

Run the linter
```bash
yarn lint
yarn lint:fix
```

Run tests
```bash
yarn test
yarn test:watch
yarn test:coverage
```


[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
