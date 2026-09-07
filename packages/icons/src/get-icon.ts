import type { IconData } from './types.js'
import { coreIcons } from './core-icons.js'

let iconRegistry: Record<string, IconData> = { ...coreIcons }

export function getIcon(name: string): IconData | undefined {
  return iconRegistry[name]
}

export function hasIcon(name: string): boolean {
  return name in iconRegistry
}

export function registerIcons(icons: Record<string, IconData>): void {
  iconRegistry = { ...iconRegistry, ...icons }
}

export function getIconNames(): string[] {
  return Object.keys(iconRegistry)
}
