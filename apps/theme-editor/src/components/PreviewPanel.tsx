import React, { useRef, useEffect } from 'react'
import type { ThemeValues } from '../hooks/use-theme'

interface Props {
  values: ThemeValues
}

export function PreviewPanel({ values }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    for (const [key, val] of Object.entries(values)) {
      ref.current.style.setProperty(key, val)
    }
  }, [values])

  return (
    <div
      ref={ref}
      style={{
        padding: 24,
        background: 'var(--y-color-bg, #fff)',
        color: 'var(--y-color-text, #111827)',
        borderRadius: 8,
        border: '1px solid var(--y-color-border, #e5e7eb)',
      }}
    >
      <h3 style={{ margin: '0 0 16px', fontSize: 'var(--y-text-lg, 1.125rem)', fontWeight: 600 }}>Component Preview</h3>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <button style={{
          padding: '8px 16px',
          background: 'var(--y-color-primary, #3b82f6)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--y-radius-6, 6px)',
          cursor: 'pointer',
          fontWeight: 500,
        }}>Primary</button>
        <button style={{
          padding: '8px 16px',
          background: 'var(--y-color-bg-muted, #f3f4f6)',
          color: 'var(--y-color-text, #111827)',
          border: 'none',
          borderRadius: 'var(--y-radius-6, 6px)',
          cursor: 'pointer',
          fontWeight: 500,
        }}>Secondary</button>
        <button style={{
          padding: '8px 16px',
          background: 'var(--y-color-danger, #ef4444)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--y-radius-6, 6px)',
          cursor: 'pointer',
          fontWeight: 500,
        }}>Danger</button>
        <button style={{
          padding: '8px 16px',
          background: 'transparent',
          color: 'var(--y-color-primary, #3b82f6)',
          border: 'none',
          borderRadius: 'var(--y-radius-6, 6px)',
          cursor: 'pointer',
          fontWeight: 500,
        }}>Ghost</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Text input"
          style={{
            padding: '8px 12px',
            border: '1px solid var(--y-color-border, #e5e7eb)',
            borderRadius: 'var(--y-radius-6, 6px)',
            background: 'var(--y-color-bg, #fff)',
            color: 'var(--y-color-text, #111827)',
            fontSize: 'var(--y-text-sm, 0.875rem)',
            outline: 'none',
          }}
        />
      </div>

      <div style={{
        padding: 'var(--y-space-4, 16px)',
        background: 'var(--y-color-bg, #fff)',
        borderRadius: 'var(--y-radius-8, 8px)',
        border: '1px solid var(--y-color-border, #e5e7eb)',
        boxShadow: 'var(--y-shadow-sm)',
      }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Card Title</div>
        <div style={{ fontSize: 'var(--y-text-sm, 0.875rem)', color: 'var(--y-color-text-secondary, #4b5563)' }}>
          This is a card component preview with the current theme applied.
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 0, borderBottom: '1px solid var(--y-color-border, #e5e7eb)' }}>
        {['Tab 1', 'Tab 2', 'Tab 3'].map((label, i) => (
          <button key={label} style={{
            padding: '8px 16px',
            background: i === 0 ? 'var(--y-color-bg-subtle, #f9fafb)' : 'transparent',
            border: 'none',
            borderBottom: i === 0 ? '2px solid var(--y-color-primary, #3b82f6)' : '2px solid transparent',
            color: i === 0 ? 'var(--y-color-primary, #3b82f6)' : 'var(--y-color-text-secondary, #4b5563)',
            cursor: 'pointer',
            fontWeight: i === 0 ? 500 : 400,
            fontSize: 'var(--y-text-sm, 0.875rem)',
          }}>{label}</button>
        ))}
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 'var(--y-radius-full, 9999px)',
          background: 'var(--y-color-primary-light, #eff6ff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'var(--y-text-xs, 0.75rem)', color: 'var(--y-color-primary, #3b82f6)',
        }}>Y</div>
        <span style={{ fontSize: 'var(--y-text-sm, 0.875rem)' }}>Spacing & radius tokens applied above</span>
      </div>
    </div>
  )
}
