[![npm](https://img.shields.io/npm/v/@egomobile/winston-log.svg)](https://www.npmjs.com/package/@egomobile/winston-log)
[![last build](https://img.shields.io/github/workflow/status/egomobile/winston-log/Publish)](https://github.com/egomobile/winston-log/actions?query=workflow%3APublish)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/egomobile/winston-log/pulls)

# @egomobile/winston-log

> A middleware for [js-log](https://github.com/egomobile/js-log), which uses [winston](https://github.com/winstonjs/winston) as base logger.

## Install

Execute the following command from your project folder, where your `package.json` file is stored:

```bash
npm install --save @egomobile/winston-log
```

The following modules are defined in [peerDependencies](https://nodejs.org/uk/blog/npm/peer-dependencies/) and have to be installed manually:

- [@egomobile/log](https://github.com/egomobile/js-log)

## Usage

```typescript
import log, { useMongoLogger } from "@egomobile/winston-log";

// run this, if you do not want to use console.log
// log.reset();

// add middleware
log.use(useWinstonLogger());

log("foo"); // default: debug
log.debug("foo"); // debug
log.error("foo"); // error
log.warn("foo"); // warning
log.info("foo"); // information
log.trace("foo"); // trace
```

## Documentation

The API documentation can be found [here](https://egomobile.github.io/winston-log/).
