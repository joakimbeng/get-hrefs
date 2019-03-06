'use strict';
const {URL} = require('url');
const cheerio = require('cheerio');
const normalizeUrl = require('normalize-url');

const FAKE_PROTOCOL = 'fake:';
const FAKE_HOSTNAME = 'base.url';

const defaultNormalizeOpts = {
	stripWWW: false
};

const unique = arr => [...new Set(arr)];

const getHrefs = (
	html,
	{baseUrl = `${FAKE_PROTOCOL}//${FAKE_HOSTNAME}`, ...normalizeOpts} = {}
) => {
	if (typeof html !== 'string') {
		throw new TypeError(
			`getHrefs expected a \`string\` but got: \`${typeof html}\``
		);
	}

	const opts = {...defaultNormalizeOpts, ...normalizeOpts};
	const $ = cheerio.load(html);
	const base = $('base');

	if (base.length !== 0) {
		baseUrl = new URL(base.first().attr('href') || '', baseUrl).toString();
	}

	const hrefs = $('a')
		.filter((_, el) => {
			const href = $(el).attr('href');
			// eslint-disable-next-line no-script-url
			return href && href !== '#' && !href.startsWith('javascript:');
		})
		.map((_, el) => {
			const href = new URL($(el).attr('href'), baseUrl).toString();
			return normalizeUrl(href, opts);
		})
		.get();

	return unique(hrefs).map(href => {
		const url = new URL(href);
		if (url.protocol === FAKE_PROTOCOL && url.hostname === FAKE_HOSTNAME) {
			return href.slice(FAKE_PROTOCOL.length + FAKE_HOSTNAME.length + 2);
		}

		return href;
	});
};

module.exports = getHrefs;
