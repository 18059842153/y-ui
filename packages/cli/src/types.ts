export type Framework = 'react' | 'vue' | 'svelte'
export type InstallMode = 'local' | 'importmap'

export interface YuiConfig {
  framework: Framework
  mode: InstallMode
  directory: string
  alias?: string
}

export interface RegistryFile {
  path: string
  content: string
}

export interface RegistryComponent {
  description: string
  dependencies: string[]
  files: Record<Framework, RegistryFile[]>
  css: string[]
  npmDependencies: Partial<Record<Framework, string[]>>
}

export interface Registry {
  version: string
  components: Record<string, RegistryComponent>
}
