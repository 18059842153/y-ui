# CDN Usage

Use Y-UI components directly from a CDN without any build step.

## Import Map Setup

Generate an import map using the CLI:

```bash
npx y-ui-cli init    # Select "Import Map" mode
npx y-ui-cli cdn init
```

This creates an `import-map.json` file. Reference it in your HTML:

```html
<script type="importmap">
  {
    "imports": {
      "@y-ui/react": "https://cdn.jsdelivr.net/npm/@y-ui/react@0.1.0/dist/index.js",
      "@y-ui/tokens": "https://cdn.jsdelivr.net/npm/@y-ui/tokens@0.1.0/dist/index.css"
    }
  }
</script>
```

## Adding Components

Add specific components to your import map:

```bash
y-ui cdn add button input
```

## CSS Tokens

Don't forget to include the token CSS:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@y-ui/tokens@0.1.0/dist/index.css" />
```
