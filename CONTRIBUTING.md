# Contributing to ngx-mq

Thanks for your interest in improving `ngx-mq`. This guide covers everything you need to set up the
project, make a change, and open a pull request that passes CI on the first try.

## Prerequisites

- **Node.js 20 or later** (CI runs on Node 22)
- **npm** (the repository ships an `.npmrc`, so a plain `npm install` resolves all dependencies)

## Getting started

If this is your first contribution, **fork the repository** first so you can push your branch and
open a pull request from your fork.

```bash
# Clone your fork
git clone https://github.com/<your-username>/ngx-mq.git
cd ngx-mq
npm install

# Build the library in watch mode...
npm run build:watch

# ...and run the demo app against it in a second terminal
cd demo
npm start
```

## Project structure

| Path           | Purpose                                                        |
| -------------- | ------------------------------------------------------------- |
| `src/lib`      | Library source (public API, providers, tokens, registry)      |
| `src/index.ts` | Public entry point. Anything exported here is part of the API |
| `guides/`      | Markdown guide pages rendered into the docs site              |
| `demo/`        | Standalone Angular app for manual testing                     |

For a deeper look at the internal design (the query registry, lifecycle, and SSR handling), see
[ARCHITECTURE.md](./ARCHITECTURE.md).

## Development workflow

| Command                 | What it does                                      |
| ----------------------- | ------------------------------------------------- |
| `npm run build`         | Build the library with ng-packagr                 |
| `npm run build:watch`   | Rebuild on change                                 |
| `npm test`              | Run the Vitest suite once                          |
| `npm run test:watch`    | Run Vitest in watch mode                           |
| `npm run test:coverage` | Run tests with coverage                            |
| `npm run lint`          | Lint with ESLint                                   |
| `npm run lint:fix`      | Lint and auto-fix                                  |
| `npm run format`        | Format with Prettier                               |
| `npm run size`          | Check the gzipped bundle against the size budget   |
| `npm run docs`          | Generate the API documentation locally             |

## Before you open a pull request

CI runs lint, tests, build, and the size check. Run them locally to match:

```bash
npm run lint
npm run test:coverage
npm run build
npm run size
```

Please also:

- Add or update tests for any behavior change.
- Update the README and TSDoc comments when you change the public API.
- Keep changes focused: one logical change per pull request.

## Commit and branch conventions

Use short, type-prefixed branch names:

```
feat/add-prefers-contrast
fix/ssr-default-value
docs/update-recipes
```

Write commits in [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) style:

```
<type>(optional scope): short description
```

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

## Pull requests

> **Do not open pull requests directly against `main`.** It is the upcoming development baseline and
> may contain unreleased or experimental work.

Each Angular major has its own release branch. Open your pull request against the branch that matches
your target Angular version:

| Branch   | Angular     |
| -------- | ----------- |
| `3.x.x`  | 20 - 22     |
| `2.x.x`  | 19          |
| `1.x.x`  | 16 - 18     |

Future majors follow the same pattern. When you open the pull request, fill in the template and give
a clear, concise description of what changed and why.

## Reporting issues

Found a bug or have a feature request? Please
[open an issue](https://github.com/martsinlabs/ngx-mq/issues) with a minimal reproduction (a
StackBlitz link is ideal) and the Angular and `ngx-mq` versions you are using.
