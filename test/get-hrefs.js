'use strict';
const test = require('ava');
const getHrefs = require('../src');

test('absolute urls', t => {
	const html = `
		<body>
			<a href="http://example.com/path?b=1&a=2">Link 1</a>
			<a href="https://another.example.com/path">Link 2</a>
		</body>
	`;
	const actual = getHrefs(html);
	const expected = [
		'http://example.com/path?a=2&b=1',
		'https://another.example.com/path'
	];
	t.same(actual, expected);
});

test('relative urls without base url', t => {
	const html = `
		<body>
			<a href="path?b=1&a=2">Link 1</a>
			<a href="/path">Link 2</a>
		</body>
	`;
	const actual = getHrefs(html);
	const expected = [
		'path?b=1&a=2',
		'/path'
	];
	t.same(actual, expected);
});

test('relative urls with base url option', t => {
	const html = `
		<body>
			<a href="path?b=1&a=2">Link 1</a>
			<a href="/path">Link 2</a>
		</body>
	`;
	const actual = getHrefs(html, {baseUrl: 'http://example.com/dir/index.html?qs=1'});
	const expected = [
		'http://example.com/dir/path?a=2&b=1',
		'http://example.com/path'
	];
	t.same(actual, expected);
});

test('relative urls with base tag', t => {
	const html = `
		<head>
			<base href="http://example.com/dir/index.html?qs=1">
		</head>
		<body>
			<a href="path?b=1&a=2">Link 1</a>
			<a href="/path">Link 2</a>
		</body>
	`;
	const actual = getHrefs(html);
	const expected = [
		'http://example.com/dir/path?a=2&b=1',
		'http://example.com/path'
	];
	t.same(actual, expected);
});

test('relative urls with base url and tag', t => {
	const html = `
		<head>
			<base href="dir/index.html?qs=1">
		</head>
		<body>
			<a href="path?b=1&a=2">Link 1</a>
			<a href="/path">Link 2</a>
		</body>
	`;
	const actual = getHrefs(html, {baseUrl: 'http://example.com/root/'});
	const expected = [
		'http://example.com/root/dir/path?a=2&b=1',
		'http://example.com/path'
	];
	t.same(actual, expected);
});

test('absolute urls with base url and tag', t => {
	const html = `
		<head>
			<base href="dir/index.html?qs=1">
		</head>
		<body>
			<a href="https://another.example.com">Link 1</a>
		</body>
	`;
	const actual = getHrefs(html, {baseUrl: 'http://example.com/root/'});
	const expected = [
		'https://another.example.com'
	];
	t.same(actual, expected);
});

test('duplicates', t => {
	const html = `
		<head>
			<base href="http://example.com/dir/index.html?qs=1">
		</head>
		<body>
			<a href="path?b=1&a=2">Link 1</a>
			<a href="/path">Link 2</a>
			<a href="path?a=2&b=1">Link 3</a>
		</body>
	`;
	const actual = getHrefs(html);
	const expected = [
		'http://example.com/dir/path?a=2&b=1',
		'http://example.com/path'
	];
	t.same(actual, expected);
});

test('anchors without href', t => {
	const html = `
		<body>
			<a onclick="alert('Yo!')">Link 1</a>
			<a href="http://example.com/path">Link 2</a>
		</body>
	`;
	const actual = getHrefs(html);
	const expected = [
		'http://example.com/path'
	];
	t.same(actual, expected);
});

test('anchors with empty href', t => {
	const html = `
		<body>
			<a href="">Link 1</a>
			<a href="http://example.com/path">Link 2</a>
		</body>
	`;
	const actual = getHrefs(html);
	const expected = [
		'http://example.com/path'
	];
	t.same(actual, expected);
});

test('anchors with href with only empty hash', t => {
	const html = `
		<body>
			<a href="#">Link 1</a>
			<a href="http://example.com/path">Link 2</a>
		</body>
	`;
	const actual = getHrefs(html);
	const expected = [
		'http://example.com/path'
	];
	t.same(actual, expected);
});

test('anchors with href beginning with javascript:', t => {
	const html = `
		<body>
			<a href="javascript:alert('hi!')">Link 1</a>
			<a href="http://example.com/path">Link 2</a>
		</body>
	`;
	const actual = getHrefs(html);
	const expected = [
		'http://example.com/path'
	];
	t.same(actual, expected);
});

test('no string', t => {
	t.throws(() => getHrefs({}), 'getHrefs expected a `string` but got: `object`');
});
