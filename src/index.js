'use strict';
var url = require('url');
var cheerio = require('cheerio');
var normalizeUrl = require('normalize-url');
var arrayUniq = require('array-uniq');

module.exports = exports = function getHrefs(html, opts) {
	if (typeof html !== 'string') {
		throw new Error('getHrefs expected a `string` but got: `' + typeof html + '`');
	}
	opts = opts || {};
	var $ = cheerio.load(html);
	var baseUrl = opts.baseUrl || '';
	var base = $('base');

	if (base.length) {
		baseUrl = url.resolve(baseUrl, base.first().attr('href') || '');
	}

	var hrefs = $('a')
		.filter(function () {
			/* eslint no-script-url: 0 */
			var href = $(this).attr('href');
			return href &&
				href !== '#' &&
				href.indexOf('javascript:') !== 0;
		})
		.map(function () {
			var href = $(this).attr('href');
			href = url.resolve(baseUrl, href);
			if (hasProtocol(href)) {
				return normalizeUrl(href);
			}
			return href;
		})
		.get();

	return arrayUniq(hrefs);
};

function hasProtocol(href) {
	return href.indexOf('://') !== -1 || href.indexOf('//') === 0;
}
