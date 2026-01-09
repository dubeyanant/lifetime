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

3.  **Literal Keys**: Avoid using bracket notation (e.g., `obj["key"]`) when dot notation (`obj.key`) is possible.

    - _Why_: Improves readability and consistency.

4.  **Accessibility (A11y)**:

    - Avoid `autoFocus` on inputs unless explicitly required for unique flows. It can disrupt screen readers.
    - **Use Explicit Button Types**: Always specify `type="button"`, `type="submit"`, or `type="reset"` for `<button>` elements. Default behavior inside forms can lead to unexpected submissions.
    - **SVGs**: Must have a `<title>` for accessibilty. If decorative, explicitly use `aria-hidden="true"`.

5.  **Global Objects**:

    - **Number.isNaN**: Use `Number.isNaN(value)` instead of global `isNaN(value)`.
    - **parseInt**: Always provide a radix (usually 10). Example: `Number.parseInt(val, 10)`.
    - _Why_: `isNaN` performs type coercion (e.g., `isNaN('string')` is true), whereas `Number.isNaN` checks strictly for `NaN`. Specifying radix prevents unexpected behavior with leading zeros.

6.  **Tailwind CSS**:
    - Ensure `biome.json` is configured to handle Tailwind directives (e.g., `@apply`, `@theme`).
    - Do not use standard CSS syntax validation on files using Tailwind features if Biome is not configured for it.

## General Typescript

- Prefer strict type safety.
- Use `async/await` over raw promises where possible.
- Handle errors gracefully in `catch` blocks.
