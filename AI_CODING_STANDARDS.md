# AI Coding Standards

This document outlines the coding standards and rules that all AI agents must follow when contributing to this project.

## Linting & Formatting with Biome

We use [Biome](https://biomejs.dev/) for linting and formatting. All code must pass `biome check`.

### Rules

1.  **No Explicit Any**: avoid using `any`. Use `unknown` if the type is truly not known, or refine the type.

    - _Why_: `any` disables type checking and can lead to runtime errors.
    - _Exception_: If absolutely necessary, suppress the rule with `// biome-ignore lint/suspicious/noExplicitAny: <reason>`.

2.  **Unused Variables**: All unused variables and function parameters must be prefixed with an underscore `_`.

    - _Why_: Helps keep code clean and indicates intent (that the variable is intentionally unused).
    - _Example_: `catch (_err) { ... }` instead of `catch (err) { ... }`.

3.  **Tailwind CSS**:
    - Ensure `biome.json` is configured to handle Tailwind directives (e.g., `@apply`, `@theme`).
    - Do not use standard CSS syntax validation on files using Tailwind features if Biome is not configured for it.

## General Typescript

- Prefer strict type safety.
- Use `async/await` over raw promises where possible.
- Handle errors gracefully in `catch` blocks.
