#!/usr/bin/env node
'use strict';
const fs = require('fs');
const meow = require('meow');
const getStdin = require('get-stdin');
const getHrefs = require('../src');

const cli = meow(`
  Usage:
    get-hrefs <html file>
    cat <html file> | get-hrefs

  Options:
    -b, --base-url	Set baseUrl
    <all other flags are passed to normalize-url>

  Examples:
    curl -s example.com | get-hrefs
    echo '<a href="http://www.example.com">Link</a>' | get-hrefs --no-strip-w-w-w
`, {
	alias: {
		b: 'base-url'
	},
	defaults: {
		baseUrl: ''
	}
});

const file = cli.input[0];

getStdin()
	.then(stdin => {
		if (!stdin && !file) {
			console.error('Error: Html file required!');
			cli.showHelp(1);
		}
		if (stdin) {
			return stdin;
		}
		return fs.readFileSync(file, 'utf8');
	})
	.then(html => getHrefs(html, cli.flags))
	.then(hrefs => {
		console.log(hrefs.join('\n'));
	});
