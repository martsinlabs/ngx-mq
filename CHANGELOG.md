# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

For releases prior to `3.0.0`, see the [GitHub releases](https://github.com/martsinlabs/ngx-mq/releases).

## [Unreleased]

### Added

- `prefersContrast()` media-feature helper.

## [3.0.0] - 2026-06-04

### Added

- `and()`, `or()` and `not()` helpers to compose boolean query signals declaratively.
- `anyPointer()` and `colorGamut()` media-feature helpers.

### Changed

- **BREAKING:** the minimum supported Angular version is now `20` (peer range `>=20 <23`).
  Use `ngx-mq@2` for Angular 19, or `ngx-mq@1` for Angular 16-18.
- Replaced the internal use of Angular's private signal primitives with the public
  `computed()` API, reducing the risk of breakage across Angular versions.

[unreleased]: https://github.com/martsinlabs/ngx-mq/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/martsinlabs/ngx-mq/releases/tag/v3.0.0
