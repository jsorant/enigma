# Encryption backend service

## Introduction

The goal of this repository is to practice some concepts with a simple backend server.

- Keywords: TDD, BDD, Clean Architecture, Clean Code
- Tools: TypeScript, mocha/chai/sinon, cucumber, nyc, supertest, REST client

## Setup project

```
npm install
```

## Run tests

### VSCode

Just hit F5 to run tests. Launch command specified in `.vscode/launch.json`.

### Using a terminal

```
npm test
```

### Code coverage

```
npm run test:coverage
```

## Run tests with BDD style (Cucumber)

BDD features are located in `/features` folder.

### Using a terminal

```
npm run test:bdd
```

### Code coverage

```
npm run test:bdd:coverage
```

## Run

### Dev mode

```
npm run dev
```

## API calls

Use VSCode `REST Client` extension to execute requests defined in `api-calls` folder.

# TODO

- Black box BDD tests with docker, docker-compose, testcontainers & axios
