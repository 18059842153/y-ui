import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const cliDir = path.join(projectRoot, 'packages', 'cli')

interface DepsGraph {
  [component: string]: string[]
}

interface RegistryFile {
  path: string
  content: string
}

interface RegistryComponent {
  description: string
  dependencies: string[]
  files: Record<string, RegistryFile[]>
  css: string[]
  npmDependencies: Record<string, string[]>
}

interface Registry {
  version: string
  components: Record<string, RegistryComponent>
}

const FRAMEWORKS = ['react', 'vue', 'svelte'] as const
const COMPONENT_NAMES = ['button', 'input', 'select', 'dialog', 'tabs', 'card', 'icon', 'form-field']

const DESCRIPTIONS: Record<string, string> = {
  button: 'Button component with variants, sizes, and loading state',
  input: 'Text input with prefix/suffix slots, clear button, and validation states',
  select: 'Select dropdown with search, keyboard navigation, and custom rendering',
  dialog: 'Modal dialog with overlay, header, body, and footer sections',
  tabs: 'Tab navigation with line, card, and segment variants',
  card: 'Card container with header, body, cover image, and loading state',
  icon: 'SVG icon renderer with icon registry and accessibility support',
  'form-field': 'Form field wrapper with label, error message, and ARIA attributes',
}

const CSS_MAP: Record<string, string[]> = {
  button: ['@y-ui/tokens/component/button.css'],
  input: ['@y-ui/tokens/component/input.css'],
  select: ['@y-ui/tokens/component/select.css'],
  dialog: ['@y-ui/tokens/component/dialog.css'],
  tabs: ['@y-ui/tokens/component/tabs.css'],
  card: ['@y-ui/tokens/component/card.css'],
  icon: ['@y-ui/tokens/component/icon.css'],
  'form-field': ['@y-ui/tokens/component/form-field.css'],
}

const NPM_DEPS: Record<string, Record<string, string[]>> = {
  button: { react: [], vue: [], svelte: [] },
  input: { react: [], vue: [], svelte: [] },
  select: { react: [], vue: [], svelte: [] },
  dialog: { react: [], vue: [], svelte: [] },
  tabs: { react: [], vue: [], svelte: [] },
  card: { react: [], vue: [], svelte: [] },
  icon: { react: [], vue: [], svelte: [] },
  'form-field': { react: [], vue: [], svelte: [] },
}

function getComponentFiles(framework: string, component: string): RegistryFile[] {
  const pkgDir = path.resolve(projectRoot, 'packages', framework, 'src', component)
  if (!fs.existsSync(pkgDir)) return []

  const files: RegistryFile[] = []
  const entries = fs.readdirSync(pkgDir, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isFile()) continue
    const name = entry.name
    if (!/\.(tsx?|vue|svelte)$/.test(name)) continue
    if (name.endsWith('.test.ts') || name.endsWith('.test.tsx') || name.endsWith('.spec.ts')) continue

    const content = fs.readFileSync(path.join(pkgDir, name), 'utf-8')
    files.push({ path: `${component}/${name}`, content })
  }

  return files
}

function buildRegistry(): Registry {
  const depsGraph: DepsGraph = JSON.parse(
    fs.readFileSync(path.join(cliDir, 'registry-deps.json'), 'utf-8'),
  )

  const pkgJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8'))
  const version = pkgJson.version || '0.1.0'

  const components: Record<string, RegistryComponent> = {}

  for (const name of COMPONENT_NAMES) {
    const files: Record<string, RegistryFile[]> = {}
    for (const fw of FRAMEWORKS) {
      files[fw] = getComponentFiles(fw, name)
    }

    components[name] = {
      description: DESCRIPTIONS[name] || name,
      dependencies: depsGraph[name] || [],
      files,
      css: CSS_MAP[name] || [],
      npmDependencies: NPM_DEPS[name] || { react: [], vue: [], svelte: [] },
    }
  }

  return { version, components }
}

const registry = buildRegistry()
const outputPath = path.join(cliDir, 'registry.json')
fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2) + '\n')

const count = Object.keys(registry.components).length
console.log(`Registry built: ${count} components → ${outputPath}`)

for (const [name, comp] of Object.entries(registry.components)) {
  const fwCounts = Object.entries(comp.files)
    .map(([fw, files]) => `${fw}:${files.length}`)
    .join(' ')
  console.log(`  ${name.padEnd(12)} ${fwCounts}`)
}
