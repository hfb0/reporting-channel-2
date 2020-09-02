# Reporting Channel

## Description

A simple reporting API using the [Express](https://expressjs.com/) framework with TypeScript.
> To see the api's swagger documentation just access http://running_api_ip/api/v1/api-docs.

## Installation

```bash
$ yarn install
```

## Running the app

### Dependencies
The project depends on [PostgresSQL](https://www.postgresql.org) and [Redis](https://redis.io).

### Development
1. Create a copy of the .env.example file and rename it to .env, now insert data in the .env file;
2. Create a copy of the ormconfig.json.example and rename it to ormconfig.json, now insert data in the ormconfig.json file;
3. Run the project:

```bash
# migrations
$ yarn typeorm migration:run

# start
$ yarn dev:server

```

### Production
1. Create a copy of the .env.example file and rename it to .env, now insert data in the .env file;
2. Create a copy of the ormconfig.json.prod.example and rename it to ormconfig.json, now insert data in the ormconfig.json file;
3. Run the project:

```bash
# migrations
$ yarn typeorm migration:run

# build
$ yarn build

# start
$ node dist/server.js

# start pm2
$ pm2 start dist/server.js --name complaint-api

```

## Test

```bash
# unit tests
$ yarn test

```

## To-do

- [x] Swagger integration
- [x] JWT for API authentication
- [x] MapQuest integration
- [x] Unit tests
- [x] Redis caching
- [x] Dependency injection
- [x] Continuous integration
