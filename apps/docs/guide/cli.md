# CLI

The `y-ui-cli` tool lets you copy component source files directly into your project, giving you full ownership and customization.

## Setup

```bash
npx y-ui-cli init
```

This creates a `y-ui.config.json` in your project root:

```json
{
  "framework": "react",
  "mode": "local",
  "directory": "src/components/ui"
}
```

## Commands

### `y-ui add <components...>`

Add components with automatic dependency resolution:

```bash
y-ui add select
# Automatically includes: select + icon (dependency)
```

### `y-ui list`

List all available components:

```
Available components

  button       Button component with variants, sizes, and loading state
  card         Card container with header, body, cover image, and loading state
  dialog       Modal dialog with overlay, header, body, and footer sections (deps: icon)
  form-field   Form field wrapper with label, error message, and ARIA attributes
  icon         SVG icon renderer with icon registry and accessibility support
  input        Text input with prefix/suffix slots, clear button, and validation states (deps: icon)
  select       Select dropdown with search, keyboard navigation, and custom rendering (deps: icon)
  tabs         Tab navigation with line, card, and segment variants
```

### `y-ui update [components...]`

Update installed components to the latest version. Without arguments, updates all.

### `y-ui cdn init` / `y-ui cdn add`

Generate and manage import maps for CDN usage:

```bash
y-ui cdn init          # Generate import map for all components
y-ui cdn add button    # Add specific components to the map
```
