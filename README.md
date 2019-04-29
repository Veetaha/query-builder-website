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
See [FAQ](#vscode-debug-with-docker) if you use `VSCode` for debugging.

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

## FAQ

### VSCode debug with docker

When debugging with `VSCode` be sure that `localRoot` and `remoteRoot` config
options have the same value. Thus, docker container working directory path must match
your local project path when you are debugging your app. That's why we have separate `"debug.docker-compose.yml"` and `"debug.dockerfile"`.

```json
{
    "type":       "node",
    "request":    "attach",
    "name":       "Attach",
    "protocol":   "inspector",
    "localRoot":  "${workspaceFolder}",
    "remoteRoot": "${workspaceFolder}"
}
```
---

### `Error: getaddrinfo EAI_AGAIN`
This error may happen when you run the application in docker container and you try to resolve some hostname via `DNS` (e.g. when connecting to the database). Try [this solution](https://development.robinwinslow.uk/2016/06/23/fix-docker-networking-dns/), `"The permanent system-wide fix"` has helped me out.

---

### `'typeorm'` entity lacks primary columns in `afterRemove()` subscriber

More info [at this issue](https://github.com/typeorm/typeorm/issues/4058), as a workaround use `event.entityId` object to get primary columns.

---

### Docker doesn't allocate tty when running `docker-compose up`

`docker-compose up` command ignores `tty: true` option in `docker-compose.yml` file.
Use `docker-compose run --rm --service-ports <service_name>` in order to get
tty allocated.

---

### `npm install` fails with Node.js v12

The blame goes to `'generate-rsa-keypair'`, you may watch the issue [here](https://github.com/LinusU/node-generate-rsa-keypair/issues/5).