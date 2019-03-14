# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [4.0.0](https://github.com/joakimbeng/get-hrefs/compare/v3.0.0...v4.0.0) (2019-03-14)


### Features

* add allowedProtocols option ([7fb4cd7](https://github.com/joakimbeng/get-hrefs/commit/7fb4cd7))


### BREAKING CHANGES

* by default only URLs with "http" or "https" protocols will be returned, to enable more e.g. "ftp" use the new "allowedProtocols" option.



# [3.0.0](https://github.com/joakimbeng/get-hrefs/compare/v2.0.0...v3.0.0) (2019-03-06)


### Bug Fixes

* **url:** don't use the global URL constructor just yet ([e5e984e](https://github.com/joakimbeng/get-hrefs/commit/e5e984e))


### Features

* **normalize:** normalize relative urls without base url ([d45c71b](https://github.com/joakimbeng/get-hrefs/commit/d45c71b)), closes [#4](https://github.com/joakimbeng/get-hrefs/issues/4)


### BREAKING CHANGES

* **normalize:** get-hrefs is rewritten using the latest JavaScript syntax which is not supported in NodeJS versions below 8.6.0. Also get-hrefs does not strip www by default anymore, to get the old behaviour the "stripWWW" option must be set



<a name="2.0.0"></a>
# [2.0.0](https://github.com/joakimbeng/get-hrefs/compare/v1.0.3...v2.0.0) (2017-09-14)


### Features

* **options:** pass options to normalize-url (fixes [#2](https://github.com/joakimbeng/get-hrefs/issues/2)) ([72ac455](https://github.com/joakimbeng/get-hrefs/commit/72ac455))


### BREAKING CHANGES

* **options:** use ES2015 syntax
