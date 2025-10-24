# Contributing

Thanks for your interest in contributing to `ngx-mq`. <br>
The goal of this project is to provide a simple and declarative way to handle media queries in Angular. <br>
Please review the guidelines below to ensure your contributions align with the project’s standards.

## Getting Started

Follow the steps below to set up the project locally.

> 💡 **Tip:**
> If you're contributing for the first time, please **fork the repository** before cloning it.
> This ensures you can push your changes to your own fork and open a Pull Request later.

```bash
# clone your fork
git clone https://github.com/<username>/ngx-mq.git
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
npm run lint
```

## Testing

Tests help ensure the library remains stable and predictable as it evolves.
Run all tests locally before submitting a pull request.

```bash
npm run test
```

Aim to keep test coverage high and meaningful.

## Pull Requests

> **Important:**  
> Do **not** open pull requests directly to the `main` branch.  
> The `main` branch represents the upcoming development baseline and may contain unreleased or experimental changes.

Each published version of **ngx-mq** has its own **release branch**:

- `1.x.x` → for Angular 16 – 18 compatible releases
- `2.x.x` → for Angular 19 – 20 compatible releases
- _(future majors will follow the same pattern)_

When submitting a PR:

1. Identify which Angular version your change applies to.
2. Open your PR against the corresponding branch (`1.x.x`, `2.x.x`, etc.).
3. Use `main` only if your contribution targets upcoming major features.

Keep pull requests clear and focused. <br>
Follow the provided template and include a concise description of your changes.
