# Introduction

Publications App

# Getting Started

Follow the below instructions to get started with this project.

## Software Dependencies

- Node.js v16
- Docker

## Installation

## Starting Server

Below modes will run

- backend-app, frontend-app postgres & redis inside docker containers.
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

Now stop the server for the `nyc` tool to generate coverage details for us.

```sh
bash dev-env.sh stop
```

Front end server: `http://localhost:8000`
Backend Server: `http://localhost:3000`
