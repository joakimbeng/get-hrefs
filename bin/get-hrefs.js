#!/usr/bin/env node
'use strict';
const fs = require('fs');
const meow = require('meow');
const getStdin = require('get-stdin');
const getHrefs = require('../src');

const cli = meow(
	`
  Usage:
    get-hrefs <html file>
    cat <html file> | get-hrefs

  Options:
    -b, --base-url	Set baseUrl
    <all other flags are passed to normalize-url>

  Examples:
    curl -s example.com | get-hrefs
    echo '<a href="http://www.example.com">Link</a>' | get-hrefs --strip-w-w-w
`,
	{
		alias: {
			b: 'base-url'
		},
		defaults: {
			baseUrl: ''
		}
	}
);

const file = cli.input[0];

const main = async () => {
	const stdin = await getStdin();

	if (!stdin && !file) {
		console.error('Error: Html file required!');
		cli.showHelp(1);
	}

	const html = stdin || fs.readFileSync(file, 'utf8');
	const hrefs = await getHrefs(html, cli.flags);

	console.log(hrefs.join('\n'));
};

main();
