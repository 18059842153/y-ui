export interface TokenDef {
  name: string
  label: string
  type: 'color' | 'spacing' | 'radius' | 'shadow' | 'font-size'
  default: string
  group: string
}

export const TOKEN_GROUPS = [
  { id: 'colors', label: 'Colors' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Border Radius' },
  { id: 'shadows', label: 'Shadows' },
  { id: 'typography', label: 'Typography' },
] as const

export const TOKENS: TokenDef[] = [
  // Colors — primary
  { name: '--y-color-primary', label: 'Primary', type: 'color', default: '#3b82f6', group: 'colors' },
  { name: '--y-color-primary-hover', label: 'Primary Hover', type: 'color', default: '#2563eb', group: 'colors' },
  { name: '--y-color-primary-active', label: 'Primary Active', type: 'color', default: '#1d4ed8', group: 'colors' },
  { name: '--y-color-primary-light', label: 'Primary Light', type: 'color', default: '#eff6ff', group: 'colors' },

  // Colors — semantic
  { name: '--y-color-danger', label: 'Danger', type: 'color', default: '#ef4444', group: 'colors' },
  { name: '--y-color-success', label: 'Success', type: 'color', default: '#22c55e', group: 'colors' },
  { name: '--y-color-warning', label: 'Warning', type: 'color', default: '#eab308', group: 'colors' },

  // Colors — surfaces
  { name: '--y-color-bg', label: 'Background', type: 'color', default: '#ffffff', group: 'colors' },
  { name: '--y-color-bg-subtle', label: 'Background Subtle', type: 'color', default: '#f9fafb', group: 'colors' },
  { name: '--y-color-bg-muted', label: 'Background Muted', type: 'color', default: '#f3f4f6', group: 'colors' },

  // Colors — text
  { name: '--y-color-text', label: 'Text', type: 'color', default: '#111827', group: 'colors' },
  { name: '--y-color-text-secondary', label: 'Text Secondary', type: 'color', default: '#4b5563', group: 'colors' },
  { name: '--y-color-text-muted', label: 'Text Muted', type: 'color', default: '#9ca3af', group: 'colors' },

  // Colors — border
  { name: '--y-color-border', label: 'Border', type: 'color', default: '#e5e7eb', group: 'colors' },
  { name: '--y-color-border-hover', label: 'Border Hover', type: 'color', default: '#d1d5db', group: 'colors' },
  { name: '--y-color-ring', label: 'Focus Ring', type: 'color', default: '#3b82f6', group: 'colors' },

  // Spacing
  { name: '--y-space-1', label: 'Space 1', type: 'spacing', default: '4px', group: 'spacing' },
  { name: '--y-space-2', label: 'Space 2', type: 'spacing', default: '8px', group: 'spacing' },
  { name: '--y-space-3', label: 'Space 3', type: 'spacing', default: '12px', group: 'spacing' },
  { name: '--y-space-4', label: 'Space 4', type: 'spacing', default: '16px', group: 'spacing' },
  { name: '--y-space-6', label: 'Space 6', type: 'spacing', default: '24px', group: 'spacing' },
  { name: '--y-space-8', label: 'Space 8', type: 'spacing', default: '32px', group: 'spacing' },

  // Radius
  { name: '--y-radius-2', label: 'Radius 2', type: 'radius', default: '2px', group: 'radius' },
  { name: '--y-radius-4', label: 'Radius 4', type: 'radius', default: '4px', group: 'radius' },
  { name: '--y-radius-6', label: 'Radius 6', type: 'radius', default: '6px', group: 'radius' },
  { name: '--y-radius-8', label: 'Radius 8', type: 'radius', default: '8px', group: 'radius' },
  { name: '--y-radius-12', label: 'Radius 12', type: 'radius', default: '12px', group: 'radius' },
  { name: '--y-radius-full', label: 'Radius Full', type: 'radius', default: '9999px', group: 'radius' },

  // Shadows
  { name: '--y-shadow-sm', label: 'Shadow SM', type: 'shadow', default: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)', group: 'shadows' },
  { name: '--y-shadow-md', label: 'Shadow MD', type: 'shadow', default: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)', group: 'shadows' },
  { name: '--y-shadow-lg', label: 'Shadow LG', type: 'shadow', default: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)', group: 'shadows' },

  // Typography
  { name: '--y-text-xs', label: 'Text XS', type: 'font-size', default: '0.75rem', group: 'typography' },
  { name: '--y-text-sm', label: 'Text SM', type: 'font-size', default: '0.875rem', group: 'typography' },
  { name: '--y-text-base', label: 'Text Base', type: 'font-size', default: '1rem', group: 'typography' },
  { name: '--y-text-lg', label: 'Text LG', type: 'font-size', default: '1.125rem', group: 'typography' },
  { name: '--y-text-xl', label: 'Text XL', type: 'font-size', default: '1.25rem', group: 'typography' },
]
