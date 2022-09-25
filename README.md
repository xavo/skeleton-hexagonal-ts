# Hexagonal Architecture, DDD & CQRS in TypeScript

### Setup

Make sure you have `nvm` installed, then:

```
nvm install
nvm use
make install
make start-dev
```

### Commands

-   `npm run test:jest` runs Jest's test suite and coverage reports
-   `npm run test:cucumber` runs Cucumber's test suite
-   `npm run test` runs both Jest and Cucumber
-   `npm run build [context]` builds the NestJS project
-   `npm run start:dev` runs the NestJS server locally
-   `npm run start:dev:withDocker` runs the NestJS server locally and up dockers
-   `npm run migration:generate` generate migration files with schema changes you made
-   `npm run migration:create` create a migration file empty
-   `npm run migration:run` run the migrations
-   `npm run migration:revert` revert the migrations

### Make Commands

-   `make start-dev` runs server on dev mode
-   `make start-consumer` runs the consumers
-   `make unit-tests` runs the unit tests with Jest
-   `make functional-tests` runs the acceptation tests with all service up
