# Backend Engineer Work Sample

This is the work sample from Thomas Mayrhofer (thomas@mayrhofer.at). It demonstrates a hexagonal/testable architecture
in nodejs.

## Goal
1. Adjust POST /users that it accepts a user and stores it in a database.
   * The user should have a unique id, a name, a unique email address and a creation date
2. Adjust GET /users that it returns (all) users from the database.
   * This endpoint should be able to receive a query parameter `created` which sorts users by creation date ascending or descending.


## Getting Started

### Prerequisite 
```
# Ensure a recent node version is available v18 is recommended
node -v # should return "v18.17.1" (see https://github.com/nvm-sh/nvm)

# Ensure docker is setup and running 
docker -v # should return "Docker version 24.0.2, build cb74dfc"


# Install dependencies
npm ci 
```

### Running Tests

The project uses [test containers](https://node.testcontainers.org/modules/postgresql/) to spin up postgres instances 
when running integration tests. Make sure to have a docker setup up and running. The tests will automatically pull all 
required docker images and execute the tests (first test run might take a while).

```
# Ensure docker is setup and running 
docker -v # should return "Docker version 24.0.2, build cb74dfc"

# Executing the tests
npm run test
```

### Running the application

```
# Setup .env 
cp .env.example .env

# Start dependencies 
docker-compose up -d

# Run the application
npm run start
```

## Project structure

The project uses a [hexagonal architecture](https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c) 
using ports and adapters. For this simple work sample this is architecture is an overkill but I wanted to showcase what
used to work fairly well in previous projects and how I envision a maintainable/testable codebase.

### API (or Incoming Ports)

All endpoints/cli scripts which are calling our application reside in the API layer. The main point about this layer is
to map from incoming sources (eg. Rest/GQL/CLI/CronJobs...) to usecases. This makes it possible to easily create additional
adapters without changing the business logic.

### Use Cases (or Application Services)

Use cases or the more academic name "Application Services" tie together the domain layer with the infrastructure layer 
(outgoing ports). In most cases this is the place where side effects (eg. persisting in DB/sending events to queue/...) 
are triggerd. Application services do not depend on concrete implementations but outgoing ports which makes it possible 
to decouple the use-cases from the "implementation details" (eg. postgres used as database)

### Domain 

The heart of each application, encapsulates all business rules. They don't contain any side effects and are plain
JS objects which can easily be tested without the need for any mocks. In this project there aren't too many business
rules that's why the layer is fairly slim right now. This is the layer where developers should spend the most time on. 

### Infrastructure

The technical details which are needed for an application to work. Use-Cases/Domain don't and shouldn't know anything 
about the DB technology used within the project. The infrastructure layer provides concrete implementations for abstract
ports.


## TODOs
 
- api/index.ts is not tested right now
- some of the helper utility methods are not tested directly/need documentation
- rate-limiting/...
- Rest API documentation (eg. via OpenApi) missing
- Rest API should use a well known format (eg. https://jsonapi.org/)
- Add error message collector to return multiple errors (right now only the first validation error will be returned)
- Express leaks too much into the API layer (might be ok for an incoming port though).
- Postgres not using a connection pool right now
- Migrations are verified with each request (should most probably be executed during start)
