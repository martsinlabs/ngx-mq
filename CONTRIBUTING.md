# Contributing

Thanks for your interest in contributing to `ngx-mq`. <br>
The goal of this project is to provide a simple and declarative way to handle media queries in Angular. <br>
Please review the guidelines below to ensure your contributions align with the project’s standards.

## Getting Started

Follow the steps below to set up the project locally.

```bash
git clone https://github.com/martsinlabs/ngx-mq.git
cd ngx-mq
npm install
npm run build:watch
cd demo
npm start
```

You’re ready to start contributing.

## Branch & Commit Rules

To keep the repository clean and easy to maintain, please follow the branch and commit naming conventions below.

### Branch naming

Use short, descriptive branch names based on the task type:

```bash
feat/add-feature
fix/resolve-issue
docs/update-guide
refactor/cleanup
```

### Commit messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) format:

```bash
<type>(optional scope): short description
```

Common types: feat, fix, docs, refactor, test, chore <br>
Keep commits focused, one change at a time.

## Code Style & Linting

Consistent code style helps keep the project readable and easy to maintain.
Run the linters before committing any changes.

```bash
npm run format
npm run lint
```

Make sure your code passes all lint checks before opening a pull request.

## Testing

Tests help ensure the library remains stable and predictable as it evolves.
Run all tests locally before submitting a pull request.

```bash
npm run test
```

Aim to keep test coverage high and meaningful.

## Pull Requests

Keep pull requests clear and focused. <br>
Follow the provided template and include a concise description of your changes. <br>
Ensure your branch is up to date before opening.
