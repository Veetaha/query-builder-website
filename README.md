# Fullstack app template

[![Build Status](https://travis-ci.com/Veetaha/query-builder-website.svg?branch=master)](https://travis-ci.com/Veetaha/query-builder-website) 
[![Coverage Status](https://coveralls.io/repos/github/Veetaha/query-builder-website/badge.svg?branch=master)](https://coveralls.io/github/Veetaha/query-builder-website?branch=master)

## Development stack

* [`TypeScript 3.4+`](https://www.typescriptlang.org/)
* [`NestJS 6+`](https://nestjs.com/)
* [`Angular 7+`](https://angular.io/)
* [`type-graphql`](https://typegraphql.ml/)
* [`typeorm (PostgreSQL)`](https://typeorm.io/#/)
* [`docker`](https://docs.docker.com/install/)
* [`docker-compose`](https://docs.docker.com/compose/install/)
* [`Travis CI`](https://travis-ci.com/)

## Startup

In order to configure the database connection, server port and auth token expiration time, 
create `'.env'` file that must contain the same variables as in `'example.env'`.

### Development

**Run:**
```bash
npm run docker:dev
```
This command creates `web_debug` image and runs it as a docker container that 
represents the backend side of your app. 

The server will listen for a debugging client on port `9229`. 
See [caveats](#caveats) if you use `VSCode` for debugging.

The backend app will automatically restart on changes in the source code thanks to `ts-node-dev` hot reloading.

### Production

**Run:**
```bash
npm run docker
```
This command creates `web` image and runs it as a docker container with minimum overhead.

### Tests

There is `'.travis.yml'` config file for continuous integration.

**Run:**
```bash
npm run test
```

## Caveats

When debugging with `VSCode` be sure that `localRoot` and `remoteRoot` config
options have the same value. Thus, docker container work directory path must match
your local project path when you are debugging your app.

```json
{
    "type": "node",
    "request": "attach",
    "name": "Attach",
    "protocol": "inspector",
    "localRoot": "${workspaceFolder}",
    "remoteRoot": "${workspaceFolder}"
}
```