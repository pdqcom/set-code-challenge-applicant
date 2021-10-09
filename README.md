# Homework

Part 1: Cypress 

1. Clone the repository and start the application. 
2. Implement (or fix!) the tests found in `./cypress` 
3. Make a PR to the repo

Part 2: Algo Challenge
1. Visit: 
  `https://codesandbox.io/s/applicant-version-set-algo-challenge-qzpgs`
2. Fork the sandbox
3. Follow the directions to complete the task. 
4. Send us a link to your forked version in an email.


## Installation

- [Node 12.0.0+ (LTS)](https://nodejs.org/), check [GH workflow file](.github/workflows/min-node-version.yml)
- [git](https://git-scm.com)

Once you have the requirements, install the deps by running install in the root directory.

```bash
npm install
```
### Quick check ✅

You can test the installation by starting the application. 

```shell
npm start
```

and you should see in the terminal

```text
> json-server --static . data.json --middlewares ./node_modules/json-server-reset


  \{^_^}/ hi!

  Loading data.json
  Loading ./node_modules/json-server-reset
  Done

  Resources
  http://localhost:3000/todos

  Home
  http://localhost:3000
```

then you should see the application when you visit: 

`http://localhost:3000`


**Note for Windows users:** if `npm start` throws an error, it is probably due to `cd todomvc; ...` first command in the `npm start `script. In this case change the working folder to "todomvc" and run `npm start` from there.

## Running Cypress 

You can open the Cypress Test Runner gui using:

```bash
$ npm run cy:open
```

```bash
$ npm run cy:run
```
### Tip

You can use the installed [start-server-and-test](https://github.com/bahmutov/start-server-and-test) utility to start the app, open Cypress and then shutdown the app when you exit Cypress.

```bash
$ npm run dev
```