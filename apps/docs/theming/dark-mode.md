# Dark Mode

Y-UI supports dark mode out of the box through semantic token overrides. No JavaScript is required for the theme switch itself — it's pure CSS.

## How It Works

Semantic tokens have different values under `[data-theme="dark"]`:

```css
:root, [data-theme="light"] {
  --y-color-bg: #ffffff;
  --y-color-text: var(--y-gray-900);
}

[data-theme="dark"] {
  --y-color-bg: var(--y-gray-950);
  --y-color-text: var(--y-gray-50);
}
```

All components reference semantic tokens, so they adapt automatically.

## Enabling Dark Mode

Set the `data-theme` attribute on the root element:

```html
<html data-theme="dark">
```

Or toggle it with JavaScript:

```ts
function toggleTheme() {
  const html = document.documentElement
  const current = html.getAttribute('data-theme')
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark')
}
```

## System Preference

Respect the user's OS preference by default:

```ts
const media = window.matchMedia('(prefers-color-scheme: dark)')

function applyTheme(dark: boolean) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

applyTheme(media.matches)
media.addEventListener('change', (e) => applyTheme(e.matches))
```

## Persisting Preference

Store the user's choice in `localStorage`:

```ts
function setTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('y-ui-theme', theme)
}

function getTheme(): 'light' | 'dark' {
  const stored = localStorage.getItem('y-ui-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
```

## What Changes in Dark Mode

| Token | Light | Dark |
|---|---|---|
| `--y-color-bg` | `#ffffff` | `var(--y-gray-950)` |
| `--y-color-bg-subtle` | `var(--y-gray-50)` | `var(--y-gray-900)` |
| `--y-color-text` | `var(--y-gray-900)` | `var(--y-gray-50)` |
| `--y-color-text-secondary` | `var(--y-gray-600)` | `var(--y-gray-400)` |
| `--y-color-border` | `var(--y-gray-200)` | `var(--y-gray-700)` |
| `--y-shadow-sm` | `rgba(0,0,0,0.1)` | `rgba(0,0,0,0.4)` |

## Custom Dark Theme

Override individual tokens for a custom dark palette:

```css
[data-theme="dark"] {
  --y-color-primary: #a78bfa;
  --y-color-bg: #0f0f23;
  --y-color-text: #e2e8f0;
}
```
