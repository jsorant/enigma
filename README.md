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

### Whitebox with Supertest

```
npm run test:bdd
```

### Blackbox with Testcontainers and generic containers

```
npm run test:bdd:bb
```

### Blackbox with Testcontainers and docker-compose files

```
npm run test:bdd:bbdc
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

## TODO

- Move to full ESM (Cucumber relies on CommonJS for now)
- Remove Chai and use Vitest assertions on BDD tests
- Propertly clone objects
