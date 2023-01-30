# Introduction

Base App

# Getting Started

Follow the below instructions to get started with this project.

## Software Dependencies

- Node.js v16
- Docker

## Installation

Install the project dependencies using the below command.

```sh
npm i
```

## Starting Server

Below modes will run

- Basic-backend-app, postgres & redis inside docker containers.
- db migrations & seeds

```sh
# to build and run the containers
bash dev-env.sh init
# to stop and remove the containers
bash dev-env.sh down
```

## Running Tests

Run component tests using the below command once the server is up & running.

```sh
npm run test
```

Or use VS Code Extension [Mocha Test Explorer](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter) for enhanced experience.

### Code Coverage

For fetching the code coverage, we need to run the server in **coverage** mode.

```sh
bash dev-env.sh init coverage
```

Now run the tests.

```sh
npm run test
```

Now stop the server for the `nyc` tool to generate coverage details for us.

```sh
bash dev-env.sh stop
```

Coverage details are generated in `coverage` folder.

Use VS Code Extension [Code Coverage Highlighter](https://marketplace.visualstudio.com/items?itemName=brainfit.vscode-coverage-highlighter) to visualize the coverage locally.