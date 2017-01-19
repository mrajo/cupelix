# cupelix [![Build Status](https://travis-ci.org/mrajo/cupelix.svg)](https://travis-ci.org/mrajo/cupelix)

> A search engine web service powered by elasticlunr.js

Cupelix is a Node.js server that runs a RESTful API web service to perform
searches against an [elasticlunr.js](http://elasticlunr.com) index.

## Install

```
npm install github:mrajo/cupelix
```

## Configuration

Right now only Basic Authentication is supported. This requires a JSON file at
`data/auth.json` in the following form:

```javascript
{
  "users": {
    "<username>": {
      "username": "<username>",
      "password": "<bcrypt-hashed password>"
    }
  }
}
```

## Building

```
make bundle
```

This creates the final bundled application at `dist/app.js`.

## Usage

```
node dist/app.js
```

Runs the service with default port 5555 using an elasticlunr index at
`data/_prod.json`.

There are a few CLI options:

### port
Type: `integer`
Default: `5555`

Example: `node dist/app.js --port 9000`

Specifies the listening port.

### env
Type: `string`
Default: `prod`

Example: `node dist/app.js --env test`

Specifies the environment. Valid values are `test`, `dev`, `stage`, and `prod`.
This for now just changes which index is loaded automatically. To run tests, the
server should be run with `test`.

### data
Type: `string`
Default: `null`

Example: `node dist/app.js --data path/to/file.ext`

Loads the specified index instead of the default file loaded by `env` variable.

## License

MIT © [Anthony Castle](http://github.com/mrajo)
