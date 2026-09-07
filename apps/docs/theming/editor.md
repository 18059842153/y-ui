# Theme Editor

The Y-UI Theme Editor is an interactive tool for customizing design tokens visually. It lets you adjust colors, spacing, border radius, and shadows with real-time preview.

## Accessing the Editor

The theme editor is available as a standalone app in the `apps/theme-editor/` directory.

```bash
pnpm --filter @y-ui/theme-editor dev
```

Then open `http://localhost:5173`.

## Features

### Color Editor

Adjust all color tokens with native color pickers:

- **Primary**: Brand color and its hover/active/light variants
- **Semantic**: Danger, success, warning colors
- **Surfaces**: Background, subtle, muted
- **Text**: Primary, secondary, muted, inverse
- **Border**: Default, hover, focus

### Spacing & Radius Editor

Fine-tune spacing scale, border radius, and font sizes using range sliders.

### Live Preview

The right panel shows live previews of core components (Button, Input, Card, Tabs) with your custom values applied. Toggle between light and dark mode to verify both themes.

### Export

Export your customized theme as:

- **CSS**: A `:root` block with all overridden custom properties, ready to paste into your stylesheet
- **JSON**: A structured token map for programmatic use

## Using Exported CSS

Copy the exported CSS and add it to your project after the Y-UI token imports:

```css
@import '@y-ui/tokens/global.css';
@import '@y-ui/tokens/semantic.css';

/* Your custom overrides */
:root {
  --y-color-primary: #8b5cf6;
  --y-color-primary-hover: #7c3aed;
  --y-color-primary-active: #6d28d9;
  --y-radius-8: 12px;
}
```

## Architecture

The editor applies custom values via `style.setProperty()` on a container element, not on `:root`. This means the editor's own UI is unaffected by theme changes — only the preview panel reflects your customizations.
