'use strict';
const url = require('url');
const cheerio = require('cheerio');
const normalizeUrl = require('normalize-url');
const arrayUniq = require('array-uniq');
const omit = require('object.omit');

module.exports = getHrefs;

function getHrefs(html, opts) {
	if (typeof html !== 'string') {
		throw new TypeError('getHrefs expected a `string` but got: `' + typeof html + '`');
	}
	opts = opts || {};
	const $ = cheerio.load(html);
	let baseUrl = opts.baseUrl || '';
	const base = $('base');
	const normalizeOpts = omit(opts, ['baseUrl']);

	if (base.length !== 0) {
		baseUrl = url.resolve(baseUrl, base.first().attr('href') || '');
	}

	const hrefs = $('a')
		.filter(function () {
			/* eslint no-script-url: 0 */
			const href = $(this).attr('href');
			return href &&
				href !== '#' &&
				href.indexOf('javascript:') !== 0;
		})
		.map(function () {
			let href = $(this).attr('href');
			href = url.resolve(baseUrl, href);
			if (hasProtocol(href)) {
				return normalizeUrl(href, normalizeOpts);
			}
			return href;
		})
		.get();

	return arrayUniq(hrefs);
}

function hasProtocol(href) {
	return href.indexOf('://') !== -1 || href.indexOf('//') === 0;
}
