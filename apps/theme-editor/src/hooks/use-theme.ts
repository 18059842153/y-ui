import { useState, useCallback, useMemo } from 'react'
import { TOKENS, type TokenDef } from '../token-definitions'

export type ThemeValues = Record<string, string>

export function useTheme() {
  const [values, setValues] = useState<ThemeValues>(() => {
    const initial: ThemeValues = {}
    for (const t of TOKENS) {
      initial[t.name] = t.default
    }
    return initial
  })

  const setValue = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const resetAll = useCallback(() => {
    const initial: ThemeValues = {}
    for (const t of TOKENS) {
      initial[t.name] = t.default
    }
    setValues(initial)
  }, [])

  const cssString = useMemo(() => {
    const lines: string[] = [':root {']
    for (const t of TOKENS) {
      const val = values[t.name]
      if (val !== t.default) {
        lines.push(`  ${t.name}: ${val};`)
      }
    }
    lines.push('}')
    return lines.join('\n')
  }, [values])

  const jsonString = useMemo(() => {
    const obj: ThemeValues = {}
    for (const t of TOKENS) {
      const val = values[t.name]
      if (val !== t.default) {
        obj[t.name] = val
      }
    }
    return JSON.stringify(obj, null, 2)
  }, [values])

  const grouped = useMemo(() => {
    const map = new Map<string, TokenDef[]>()
    for (const t of TOKENS) {
      const group = map.get(t.group) ?? []
      group.push(t)
      map.set(t.group, group)
    }
    return map
  }, [])

  return { values, setValue, resetAll, cssString, jsonString, grouped, tokens: TOKENS }
}
