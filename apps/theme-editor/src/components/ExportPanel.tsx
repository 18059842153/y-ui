import React, { useState } from 'react'

interface Props {
  css: string
  json: string
}

export function ExportPanel({ css, json }: Props) {
  const [format, setFormat] = useState<'css' | 'json'>('css')

  const content = format === 'css' ? css : json

  const download = () => {
    const ext = format === 'css' ? 'css' : 'json'
    const mime = format === 'css' ? 'text/css' : 'application/json'
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `theme.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copy = () => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => setFormat('css')}
          style={{
            padding: '6px 12px',
            background: format === 'css' ? 'var(--y-color-primary, #3b82f6)' : 'transparent',
            color: format === 'css' ? '#fff' : 'var(--y-color-text, #111827)',
            border: '1px solid var(--y-color-border, #e5e7eb)',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 13,
          }}
        >CSS</button>
        <button
          onClick={() => setFormat('json')}
          style={{
            padding: '6px 12px',
            background: format === 'json' ? 'var(--y-color-primary, #3b82f6)' : 'transparent',
            color: format === 'json' ? '#fff' : 'var(--y-color-text, #111827)',
            border: '1px solid var(--y-color-border, #e5e7eb)',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 13,
          }}
        >JSON</button>
        <div style={{ flex: 1 }} />
        <button onClick={copy} style={{ padding: '6px 12px', border: '1px solid var(--y-color-border, #e5e7eb)', borderRadius: 4, cursor: 'pointer', fontSize: 13, background: '#fff' }}>Copy</button>
        <button onClick={download} style={{ padding: '6px 12px', background: 'var(--y-color-primary, #3b82f6)', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>Download</button>
      </div>
      <pre style={{
        background: '#1f2937',
        color: '#e5e7eb',
        padding: 16,
        borderRadius: 8,
        fontSize: 12,
        fontFamily: 'monospace',
        overflow: 'auto',
        maxHeight: 300,
        margin: 0,
        lineHeight: 1.6,
      }}>{content}</pre>
    </div>
  )
}
