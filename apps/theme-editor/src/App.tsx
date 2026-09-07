import React, { useState } from 'react'
import { useTheme } from './hooks/use-theme'
import { ColorEditor } from './components/ColorEditor'
import { SpacingEditor } from './components/SpacingEditor'
import { PreviewPanel } from './components/PreviewPanel'
import { ExportPanel } from './components/ExportPanel'
import { TOKEN_GROUPS } from './token-definitions'

type Tab = 'colors' | 'spacing' | 'radius' | 'shadows' | 'typography' | 'export'

export function App() {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState<Tab>('colors')

  const tabs: { id: Tab; label: string }[] = [
    ...TOKEN_GROUPS.map((g) => ({ id: g.id as Tab, label: g.label })),
    { id: 'export', label: 'Export' },
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{
        width: 420,
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Y-UI Theme Editor</h1>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6b7280' }}>Customize design tokens and export CSS or JSON</p>
        </div>

        <div style={{ display: 'flex', gap: 0, padding: '0 12px', borderBottom: '1px solid #e5e7eb', overflowX: 'auto' }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '10px 12px',
                border: 'none',
                borderBottom: activeTab === t.id ? '2px solid #3b82f6' : '2px solid transparent',
                background: 'transparent',
                color: activeTab === t.id ? '#3b82f6' : '#6b7280',
                fontWeight: activeTab === t.id ? 500 : 400,
                cursor: 'pointer',
                fontSize: 13,
                whiteSpace: 'nowrap',
              }}
            >{t.label}</button>
          ))}
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          {activeTab === 'colors' && (
            <ColorEditor
              tokens={theme.grouped.get('colors') ?? []}
              values={theme.values}
              onChange={theme.setValue}
            />
          )}
          {activeTab === 'spacing' && (
            <SpacingEditor
              tokens={theme.grouped.get('spacing') ?? []}
              values={theme.values}
              onChange={theme.setValue}
            />
          )}
          {activeTab === 'radius' && (
            <SpacingEditor
              tokens={theme.grouped.get('radius') ?? []}
              values={theme.values}
              onChange={theme.setValue}
            />
          )}
          {activeTab === 'shadows' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(theme.grouped.get('shadows') ?? []).map((t) => (
                <div key={t.name}>
                  <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 4 }}>{t.label}</label>
                  <input
                    type="text"
                    value={theme.values[t.name] ?? t.default}
                    onChange={(e) => theme.setValue(t.name, e.target.value)}
                    style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: 4, fontSize: 11, fontFamily: 'monospace' }}
                  />
                  <div style={{ marginTop: 4, height: 32, borderRadius: 4, background: '#f3f4f6', boxShadow: theme.values[t.name] ?? t.default }} />
                </div>
              ))}
            </div>
          )}
          {activeTab === 'typography' && (
            <SpacingEditor
              tokens={theme.grouped.get('typography') ?? []}
              values={theme.values}
              onChange={theme.setValue}
            />
          )}
          {activeTab === 'export' && (
            <ExportPanel css={theme.cssString} json={theme.jsonString} />
          )}
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={theme.resetAll}
            style={{
              padding: '6px 16px',
              background: 'transparent',
              border: '1px solid #d1d5db',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 13,
              color: '#6b7280',
            }}
          >Reset All</button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 32, background: '#f9fafb' }}>
        <PreviewPanel values={theme.values} />
      </div>
    </div>
  )
}
