import React from 'react'
import type { TokenDef } from '../token-definitions'

interface Props {
  tokens: TokenDef[]
  values: Record<string, string>
  onChange: (name: string, value: string) => void
}

function parsePx(val: string): number {
  const n = parseFloat(val)
  return isNaN(n) ? 0 : n
}

function getMax(type: string): number {
  if (type === 'spacing') return 128
  if (type === 'radius') return 32
  if (type === 'font-size') return 3
  return 64
}

export function SpacingEditor({ tokens, values, onChange }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {tokens.map((t) => {
        const current = values[t.name] ?? t.default
        const px = parsePx(current)
        const max = getMax(t.type)
        const isRem = current.includes('rem')

        return (
          <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <label style={{ width: 120, fontSize: 13, fontWeight: 500 }}>{t.label}</label>
            <input
              type="range"
              min={0}
              max={max}
              step={t.type === 'font-size' ? 0.125 : 1}
              value={isRem ? px * 16 : px}
              onChange={(e) => {
                const v = parseFloat(e.target.value)
                if (isRem) {
                  onChange(t.name, `${v / 16}rem`)
                } else {
                  onChange(t.name, `${Math.round(v)}px`)
                }
              }}
              style={{ flex: 1 }}
            />
            <input
              type="text"
              value={current}
              onChange={(e) => onChange(t.name, e.target.value)}
              style={{ width: 80, padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: 4, fontSize: 12, fontFamily: 'monospace' }}
            />
          </div>
        )
      })}
    </div>
  )
}
