import React from 'react'
import type { TokenDef } from '../token-definitions'

interface Props {
  tokens: TokenDef[]
  values: Record<string, string>
  onChange: (name: string, value: string) => void
}

export function ColorEditor({ tokens, values, onChange }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
      {tokens.map((t) => (
        <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="color"
            value={values[t.name] ?? t.default}
            onChange={(e) => onChange(t.name, e.target.value)}
            style={{ width: 32, height: 32, border: 'none', padding: 0, cursor: 'pointer', borderRadius: 4 }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{t.label}</div>
            <div style={{ fontSize: 11, color: '#6b7280', fontFamily: 'monospace' }}>{values[t.name] ?? t.default}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
