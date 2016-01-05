# get-hrefs

[![Build status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![XO code style][codestyle-image]][codestyle-url]

> Get all href urls from an HTML string

## Installation

Install `get-hrefs` using [npm](https://www.npmjs.com/):

```bash
npm install --save get-hrefs
```

## Usage

### Module usage

```javascript
var getHrefs = require('get-hrefs');

getHrefs(`
	<body>
		<a href="http://example.com">Example</a>
	</body>
`);
// ["http://example.com"]

getHrefs(`
	<head>
		<base href="http://example.com/path1/">
	</head>
	<body>
		<a href="path2/index.html">Example</a>
	</body>
`);
// ["http://example.com/path1/path2/index.html"]
```

### CLI usage

```bash
$> get-hrefs --help

Get all href urls from an HTML string

  Usage:
  	get-hrefs <html file>
  	cat <html file> | get-hrefs

  Options:
  	-b, --base-url	Set baseUrl

  Examples:
  	curl -s example.com | get-hrefs
```


## API

### `getHrefs(html, [options])`

| Name | Type | Description |
|------|------|-------------|
| html | `String` | The HTML string to extract hrefs from |
| options | `Object` | Optional options |

Returns: `Array<String>`, all unique and [normalized](https://github.com/sindresorhus/normalize-url) hrefs resolved from any provided [`baseUrl`](#optionsbaseurl) and [`<base href="...">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base) in the HTML document.

#### options.baseUrl

Type: `String`  
Default: `""`

The baseUrl to use for relative hrefs. The module also takes [`<base ...>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base) tags into account.

## Related modules

* [get-urls](https://github.com/sindresorhus/get-urls) - Get all urls in a string

## License

MIT © [Joakim Carlstein](http://joakim.beng.se/)

[npm-url]: https://npmjs.org/package/get-hrefs
[npm-image]: https://badge.fury.io/js/get-hrefs.svg
[travis-url]: https://travis-ci.org/joakimbeng/get-hrefs
[travis-image]: https://travis-ci.org/joakimbeng/get-hrefs.svg?branch=master
[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat
