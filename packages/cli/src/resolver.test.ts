import { describe, it, expect } from 'vitest'
import { resolveDependencies, validateComponentNames } from '../src/resolver.js'
import type { Registry } from '../src/types.js'

const mockRegistry: Registry = {
  version: '0.1.0',
  components: {
    button: {
      description: 'Button component',
      dependencies: [],
      files: {
        react: [{ path: 'button.tsx', content: '...' }],
        vue: [{ path: 'YButton.vue', content: '...' }],
        svelte: [{ path: 'YButton.svelte', content: '...' }],
      },
      css: ['button.css'],
      npmDependencies: {},
    },
    icon: {
      description: 'Icon component',
      dependencies: [],
      files: {
        react: [{ path: 'icon.tsx', content: '...' }],
        vue: [{ path: 'YIcon.vue', content: '...' }],
        svelte: [{ path: 'YIcon.svelte', content: '...' }],
      },
      css: ['icon.css'],
      npmDependencies: {},
    },
    select: {
      description: 'Select component',
      dependencies: ['button', 'icon'],
      files: {
        react: [{ path: 'select.tsx', content: '...' }],
        vue: [{ path: 'YSelect.vue', content: '...' }],
        svelte: [{ path: 'YSelect.svelte', content: '...' }],
      },
      css: ['select.css'],
      npmDependencies: {},
    },
    input: {
      description: 'Input component',
      dependencies: ['icon'],
      files: {
        react: [{ path: 'input.tsx', content: '...' }],
        vue: [{ path: 'YInput.vue', content: '...' }],
        svelte: [{ path: 'YInput.svelte', content: '...' }],
      },
      css: ['input.css'],
      npmDependencies: {},
    },
  },
}

describe('resolveDependencies', () => {
  it('resolves a component with no dependencies', () => {
    const result = resolveDependencies(['button'], mockRegistry)
    expect(result.map((r) => r.name)).toEqual(['button'])
  })

  it('resolves transitive dependencies in topological order', () => {
    const result = resolveDependencies(['select'], mockRegistry)
    const names = result.map((r) => r.name)
    expect(names).toContain('button')
    expect(names).toContain('icon')
    expect(names).toContain('select')
    const selectIdx = names.indexOf('select')
    const buttonIdx = names.indexOf('button')
    const iconIdx = names.indexOf('icon')
    expect(buttonIdx).toBeLessThan(selectIdx)
    expect(iconIdx).toBeLessThan(selectIdx)
  })

  it('deduplicates shared dependencies', () => {
    const result = resolveDependencies(['select', 'input'], mockRegistry)
    const names = result.map((r) => r.name)
    const iconCount = names.filter((n) => n === 'icon').length
    expect(iconCount).toBe(1)
    expect(names).toContain('button')
    expect(names).toContain('icon')
    expect(names).toContain('select')
    expect(names).toContain('input')
  })

  it('ignores unknown component names', () => {
    const result = resolveDependencies(['nonexistent'], mockRegistry)
    expect(result).toEqual([])
  })

  it('handles circular dependencies without infinite loop', () => {
    const circular: Registry = {
      version: '0.1.0',
      components: {
        a: { description: '', dependencies: ['b'], files: {} as any, css: [], npmDependencies: {} },
        b: { description: '', dependencies: ['a'], files: {} as any, css: [], npmDependencies: {} },
      },
    }
    const result = resolveDependencies(['a'], circular)
    expect(result.map((r) => r.name).sort()).toEqual(['a', 'b'])
  })
})

describe('validateComponentNames', () => {
  it('returns empty array for all valid names', () => {
    const invalid = validateComponentNames(['button', 'select'], mockRegistry)
    expect(invalid).toEqual([])
  })

  it('returns unknown names', () => {
    const invalid = validateComponentNames(['button', 'foobar', 'baz'], mockRegistry)
    expect(invalid).toEqual(['foobar', 'baz'])
  })
})
