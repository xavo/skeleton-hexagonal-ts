# Hexagonal Architecture, DDD & CQRS in TypeScript

### Setup

Make sure you have `nvm` installed, then:

```
nvm install
nvm use
make install
make start
```

### Commands

-   `npm run test:jest` runs Jest's test suite and coverage reports
-   `npm run test:cucumber` runs Cucumber's test suite
-   `npm run test` runs both Jest and Cucumber
-   `npm run build [context]` builds the NestJS project
-   `npm run start:dev` runs the NestJS server locally on Data context
-   `npm run start:dev dataEngine` runs the NestJS server locally on Data engine context
-   `npm run migration:generate` generate migration files with schema changes you made
-   `npm run migration:create` create a migration file empty
-   `npm run migration:run` run the migrations
-   `npm run migration:revert` revert the migrations

### Make Commands

-   `make start-data` runs server over data context
-   `make start-dataEngine` runs server over data engine context
-   `make start-consumer` runs the consumers
-   `make unit-tests` runs the unit tests with Jest
-   `make cucumber-tests` runs the acceptation tests with Cucumber
-   `make functional-tests` runs the acceptation tests with all service up

### Code coverage

Github Actions will fail if your code coverage doesn't meet all the following
global thresholds:

-   At least 80% of the branches must be covered by tests
-   At least 80% of all function must be covered by tests
-   At least 80% os all lines must be covered by tests
-   No more than 10 statements without tests

After running the command `npm run test:jest` you can open the file
`./coverage/index.html` with your browser for more details on the coverage
status of your package.

### Troubleshoot

When running `npm install` you might run into an error stating that you don't
have a valid password. To fix this you need to rename the following file:
`.npmrc.dist` to `.npmrc` and add a real token. You can generate a new token
by visiting [GitHub](https://github.com/) -> Your avatar -> settings ->
Developer settings -> Personal access tokens -> Generate new token. Don't
forget to tick `read:packages` and click Generate.
