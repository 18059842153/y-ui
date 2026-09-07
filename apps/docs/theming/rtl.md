# RTL Support

Y-UI provides built-in right-to-left (RTL) support for languages like Arabic, Hebrew, and Persian.

## Enabling RTL

Set the `dir` attribute on the root element:

```html
<html dir="rtl">
```

Or scope it to a container:

```html
<div dir="rtl">
  <y-button>مرحبا</y-button>
</div>
```

## How It Works

Components use CSS logical properties and directional utilities:

- **Logical properties**: `margin-inline-start` instead of `margin-left`, `padding-inline` instead of `padding-left/right`
- **`[dir="rtl"]` selectors**: For components that need explicit direction-aware styles (e.g., icon rotation, transform origins)

```css
.y-button {
  padding-inline: var(--y-space-4);
  gap: var(--y-space-2);
}

.y-button__icon {
  margin-inline-end: var(--y-space-2);
}
```

## Icon Direction

Icons that imply direction (arrows, chevrons) are automatically mirrored in RTL:

```css
[dir="rtl"] .y-icon--directional {
  transform: scaleX(-1);
}
```

## Core Utility

The `@y-ui/core` package provides an `isRTL()` helper:

```ts
import { isRTL } from '@y-ui/core'

if (isRTL()) {
  // Adjust custom component behavior
}
```

## Per-Component Notes

| Component | RTL Behavior |
|---|---|
| Button | Icon + text gap flips correctly |
| Input | Clear button and prefix/suffix swap sides |
| Select | Chevron stays right-aligned in both directions |
| Dialog | Centered layout, no directional change needed |
| Tabs | Tab list flows right-to-left naturally |
| Card | Horizontal layouts flip correctly |

## Testing RTL

Test your components in both directions:

```html
<!-- Toggle for testing -->
<button onclick="document.documentElement.dir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl'">
  Toggle Direction
</button>
```
