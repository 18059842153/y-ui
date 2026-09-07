# Token Architecture

Y-UI uses a three-layer CSS custom property system for theming. Each layer has a clear responsibility, making the design tokens easy to understand and override.

## Layers

```
Global Tokens  →  Semantic Tokens  →  Component Tokens
(primitives)      (meaning-based)     (scoped)
```

### Global Tokens

Raw design primitives — colors, spacing, radius, typography, z-index. These are framework-agnostic and carry no semantic meaning.

```css
:root {
  --y-blue-500: #3b82f6;
  --y-space-4: 16px;
  --y-radius-8: 8px;
  --y-text-sm: 0.875rem;
}
```

Global tokens are defined in `@y-ui/tokens/global.css`.

### Semantic Tokens

Map global tokens to **meaningful roles** like "primary color", "background", "text", "border". These are the tokens you override when theming.

```css
:root {
  --y-color-primary: var(--y-blue-500);
  --y-color-bg: #ffffff;
  --y-color-text: var(--y-gray-900);
  --y-color-border: var(--y-gray-200);
}
```

Semantic tokens are defined in `@y-ui/tokens/semantic.css` and have different values for light and dark themes.

### Component Tokens

Scoped to individual components. They reference semantic tokens and add component-specific values.

```css
.y-button {
  --y-button-bg: var(--y-color-primary);
  --y-button-radius: var(--y-radius-8);
  --y-button-padding: var(--y-space-2) var(--y-space-4);
}
```

Component tokens live in `@y-ui/tokens/component/*.css`.

## Overriding Tokens

Override at any level to customize the design:

```css
/* Change the primary color globally */
:root {
  --y-color-primary: #8b5cf6;
  --y-color-primary-hover: #7c3aed;
}

/* Or scope it to a section */
.sidebar {
  --y-color-bg: var(--y-gray-50);
}

/* Or override a single component */
.my-special-button {
  --y-button-bg: #8b5cf6;
  --y-button-radius: 9999px;
}
```

## Token Naming Convention

All tokens follow the pattern `--y-{category}-{name}`:

| Category | Examples |
|---|---|
| Colors | `--y-blue-500`, `--y-gray-200` |
| Spacing | `--y-space-1` (4px) through `--y-space-16` (64px) |
| Radius | `--y-radius-2` through `--y-radius-full` |
| Typography | `--y-text-sm`, `--y-font-medium` |
| Shadows | `--y-shadow-sm`, `--y-shadow-md`, `--y-shadow-lg` |
| Z-Index | `--y-z-dropdown`, `--y-z-modal` |

## Using Tokens in JavaScript

Tokens are accessible as CSS custom properties:

```ts
const primary = getComputedStyle(document.documentElement)
  .getPropertyValue('--y-color-primary')
  .trim()
```
