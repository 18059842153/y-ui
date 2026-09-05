# Y-UI 技术方案实现文档

> 跨框架、网络级按需加载的轻量组件库

---

## 1. 项目概述

### 1.1 核心目标

| 目标 | 说明 |
|------|------|
| **跨框架** | 一套组件源码，编译输出 Vue / React / Svelte 三个版本 |
| **网络级按需加载** | 每个组件是独立 ESM 文件，通过 CDN 加载，不打包成大 chunk |
| **网络缓存复用** | 同一组件加载一次后浏览器缓存，跨项目共享 |
| **简单、轻量、快速** | 最小运行时开销，单组件极小体积 |

### 1.2 设计哲学

- **零 Bundler 依赖**：消费者不需要 Webpack/Vite 打包组件库代码，浏览器原生 ESM 加载
- **编译时跨框架**：用 Mitosis 在构建时编译出各框架版本，而非运行时适配
- **CSS 即样式**：UnoCSS 原子类 + 三层 Token 体系，不引入 CSS-in-JS 运行时
- **渐进增强**：SSR 降级可用，客户端 hydrate 后完整交互

---

## 2. 技术栈总览

```
┌─────────────────────────────────────────────────────────┐
│                    消费者应用层                           │
│         Vue 3 / React 18+ / Svelte 4+                   │
├─────────────────────────────────────────────────────────┤
│                 框架适配层 (Adapter)                      │
│   React Hooks / Vue Composables / Svelte Stores          │
├─────────────────────────────────────────────────────────┤
│              Mitosis 编译层 (Build-time)                  │
│         统一组件源码 → React / Vue / Svelte               │
├─────────────────────────────────────────────────────────┤
│                 Headless Core 层                          │
│        纯 TS 状态机 (FSM) + ARIA 派生 + 工具函数           │
├─────────────────────────────────────────────────────────┤
│                 样式层 (UnoCSS)                           │
│     三层 Token + 原子类 Preset + 动画 Token               │
├─────────────────────────────────────────────────────────┤
│                 构建层 (Vite 4 + Rollup)                  │
│         多入口打包 → 每组件独立 ESM 输出                    │
├─────────────────────────────────────────────────────────┤
│                 分发层 (CDN + Import Map)                  │
│      原生 ESM + Import Map 版本锁定 + 网络缓存             │
└─────────────────────────────────────────────────────────┘
```

### 2.1 核心技术选型

| 领域 | 选型 | 理由 |
|------|------|------|
| 跨框架编译 | **Mitosis** | 编译时转换，零运行时开销；统一 JSX-like 语法 |
| 样式方案 | **UnoCSS** | 原子化 CSS 引擎，按需生成；以 Preset 形式分发 |
| 构建工具 | **Vite 4 + Rollup** | 多入口打包成熟；HMR 开发体验好 |
| 模块分发 | **原生 ESM + Import Map** | 零运行时（对比 Module Federation 的 5-10KB） |
| 状态管理 | **纯 TS FSM** | 框架无关，可测试，可独立发布 |
| 包管理 | **pnpm workspace** | monorepo 标准方案 |
| 类型系统 | **TypeScript 5** | 全量类型覆盖 |

---

## 3. Monorepo 结构

```
y-ui/
├── packages/
│   ├── core/                    # Headless Core：状态机 + ARIA + 工具函数
│   │   ├── src/
│   │   │   ├── machines/        # 各组件 FSM (select, dialog, tabs...)
│   │   │   ├── aria/            # ARIA 属性派生函数
│   │   │   ├── utils/           # 通用工具 (focus trap, keyboard nav...)
│   │   │   ├── breakpoints.ts   # 断点定义
│   │   │   └── index.ts
│   │   └── package.json         # @y-ui/core
│   │
│   ├── components/              # Mitosis 组件源码
│   │   ├── src/
│   │   │   ├── button/
│   │   │   │   ├── button.tsx   # Mitosis 组件
│   │   │   │   └── button.types.ts
│   │   │   ├── select/
│   │   │   ├── dialog/
│   │   │   ├── tabs/
│   │   │   ├── virtual-list/
│   │   │   └── ...
│   │   └── package.json         # @y-ui/components (源码包)
│   │
│   ├── react/                   # Mitosis 编译输出 → React
│   │   ├── src/
│   │   │   ├── button/
│   │   │   ├── hooks/           # useSelect, useDialog, useTabs...
│   │   │   └── index.ts
│   │   └── package.json         # @y-ui/react
│   │
│   ├── vue/                     # Mitosis 编译输出 → Vue
│   │   ├── src/
│   │   │   ├── button/
│   │   │   ├── composables/     # useSelect, useDialog, useTabs...
│   │   │   └── index.ts
│   │   └── package.json         # @y-ui/vue
│   │
│   ├── svelte/                  # Mitosis 编译输出 → Svelte
│   │   ├── src/
│   │   │   ├── button/
│   │   │   ├── stores/          # selectStore, dialogStore...
│   │   │   └── index.ts
│   │   └── package.json         # @y-ui/svelte
│   │
│   ├── tokens/                  # 设计 Token (CSS 变量)
│   │   ├── src/
│   │   │   ├── global.css       # 全局 Token (颜色、间距、圆角...)
│   │   │   ├── semantic.css     # 语义 Token (主题可切换)
│   │   │   ├── component/       # 组件级 Token
│   │   │   └── animations.css   # 动画 Token
│   │   └── package.json         # @y-ui/tokens
│   │
│   ├── uno-preset/              # UnoCSS Preset
│   │   ├── src/
│   │   │   ├── preset.ts        # Preset 定义 (rules, shortcuts, variants)
│   │   │   └── theme.ts         # Token → UnoCSS theme 映射
│   │   └── package.json         # @y-ui/uno-preset
│   │
│   ├── hooks/                   # 框架无关的 Headless Hooks 定义
│   │   ├── src/
│   │   │   ├── use-select/
│   │   │   ├── use-dialog/
│   │   │   ├── use-tabs/
│   │   │   └── use-virtual-scroll/
│   │   └── package.json         # @y-ui/hooks
│   │
│   ├── icons/                   # 图标系统
│   │   ├── src/
│   │   │   ├── data/            # SVG path data (纯 TS 对象)
│   │   │   ├── core-icons.ts    # ~40 核心图标定义
│   │   │   └── types.ts         # IconData 类型
│   │   └── package.json         # @y-ui/icons
│   │
│   └── cli/                     # CLI 工具
│       ├── src/
│       │   ├── commands/
│       │   │   ├── add.ts       # npx y-ui add button
│       │   │   ├── init.ts      # npx y-ui init
│       │   │   └── list.ts      # npx y-ui list
│       │   ├── registry.ts      # 组件注册表查询
│       │   └── resolver.ts      # 依赖解析
│       └── package.json         # y-ui-cli
│
├── apps/
│   ├── docs/                    # 文档站 (VitePress / Storybook)
│   └── playground/              # 开发调试用
│
├── scripts/
│   ├── build.ts                 # 统一构建脚本
│   ├── compile.ts               # Mitosis 编译管线
│   └── release.ts               # 版本发布脚本
│
├── turbo.json                   # Turborepo 配置
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

---

## 4. 构建管线

### 4.1 Mitosis 编译流程

```
Mitosis 源码 (.tsx)
    │
    ▼
@mitosisjs/compiler
    │
    ├──→ React JSX → @y-ui/react (ESM)
    ├──→ Vue SFC   → @y-ui/vue  (ESM)
    └──→ Svelte     → @y-ui/svelte (ESM)
```

Mitosis 配置文件：

```ts
// mitosis.config.ts
import type { MitosisConfig } from '@mitosisjs/core'

export default {
  files: 'packages/components/src/**/*.{tsx,mito}',
  dest: {
    react: 'packages/react/src',
    vue: 'packages/vue/src',
    svelte: 'packages/svelte/src',
  },
  options: {
    react: {
      stylesType: 'styled-components', // 实际输出为 UnoCSS class，此处仅做占位
    },
    vue: {
      api: 'composition',
    },
  },
} as MitosisConfig
```

### 4.2 Vite 多入口构建

```ts
// vite.config.ts (以 React 包为例)
import { defineConfig } from 'vite'
import { readdirSync } from 'fs'
import { resolve } from 'path'

const components = readdirSync('packages/react/src')
  .filter(name => !name.startsWith('.') && !name.includes('index'))

export default defineConfig({
  build: {
    lib: {
      entry: Object.fromEntries(
        components.map(name => [
          name,
          resolve(__dirname, `packages/react/src/${name}/index.ts`),
        ])
      ),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@y-ui/core', '@y-ui/tokens'],
      output: {
        // 每个组件输出为独立 ESM 文件
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        // 保留目录结构，便于 CDN 路径映射
        preserveModules: true,
        preserveModulesRoot: 'packages/react/src',
      },
    },
    // 不生成 CSS 文件（样式由 UnoCSS 在消费者端生成）
    cssCodeSplit: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
})
```

### 4.3 构建产物结构

```
dist/
├── button.js              # Button 组件 ESM (独立文件)
├── select.js              # Select 组件 ESM
├── dialog.js              # Dialog 组件 ESM
├── tabs.js                # Tabs 组件 ESM
├── virtual-list.js        # VirtualList 组件 ESM
├── chunks/
│   ├── core-fsm-[hash].js # 共享状态机 chunk
│   └── utils-[hash].js    # 共享工具 chunk
└── package.json           # 包含 exports map
```

### 4.4 package.json exports 映射

```json
{
  "name": "@y-ui/react",
  "type": "module",
  "exports": {
    "./button": {
      "import": "./dist/button.js",
      "types": "./dist/button.d.ts"
    },
    "./select": {
      "import": "./dist/select.js",
      "types": "./dist/select.d.ts"
    },
    "./dialog": {
      "import": "./dist/dialog.js",
      "types": "./dist/dialog.d.ts"
    }
  },
  "sideEffects": false
}
```

---

## 5. CDN 分发方案

### 5.1 Import Map 配置

消费者在 HTML 中声明 Import Map，锁定版本：

```html
<script type="importmap">
{
  "imports": {
    "@y-ui/react/": "https://cdn.y-ui.com/react/1.0.0/",
    "@y-ui/tokens/": "https://cdn.y-ui.com/tokens/1.0.0/",
    "@y-ui/core/": "https://cdn.y-ui.com/core/1.0.0/"
  }
}
</script>
```

### 5.2 组件加载方式

```tsx
// 按需加载单个组件 — 只下载 button.js (~3KB gzip)
import { YButton } from '@y-ui/react/button'

// 组件内部依赖自动解析
// button.js → imports core/fsm.js, tokens/global.css (via side effect)
```

### 5.3 版本管理策略

- **全局统一版本**：所有组件共享同一版本号，Import Map 中只需声明一次版本
- **CDN URL 结构**：`https://cdn.y-ui.com/{package}/{version}/{component}.js`
- **缓存策略**：文件名含 content hash，CDN 设置 `Cache-Control: max-age=31536000, immutable`
- **版本锁定**：Import Map 天然锁定版本，不存在版本漂移

### 5.4 对比 Module Federation

| 维度 | 原生 ESM + Import Map | Module Federation |
|------|----------------------|-------------------|
| 运行时开销 | **0 KB** | ~5-10 KB |
| Bundler 依赖 | **无** | 需要 Webpack/Vite 插件 |
| 浏览器兼容 | ES2020+ (95%+) | 全版本 |
| 配置复杂度 | **Import Map 一段 JSON** | 两端配置 shared/exposes/remotes |
| 缓存粒度 | **单文件级** | chunk 级 |
| SSR 支持 | 需 Node ESM loader | 内建支持 |

**结论**：原生 ESM + Import Map 在轻量场景下完胜。SSR 场景通过 Node.js 的 ESM loader 解决。

---

## 6. 样式架构

### 6.1 三层 Token 体系

```css
/* 第一层：全局 Token — 原始设计值，不可被主题覆盖 */
:root {
  /* 颜色 */
  --y-blue-50: #eff6ff;
  --y-blue-100: #dbeafe;
  --y-blue-500: #3b82f6;
  --y-blue-600: #2563eb;
  --y-blue-700: #1d4ed8;
  --y-gray-50: #f9fafb;
  --y-gray-900: #111827;

  /* 间距 */
  --y-space-1: 4px;
  --y-space-2: 8px;
  --y-space-3: 12px;
  --y-space-4: 16px;

  /* 圆角 */
  --y-radius-2: 2px;
  --y-radius-4: 4px;
  --y-radius-8: 8px;

  /* 字体 */
  --y-font-sans: 'Inter', system-ui, sans-serif;
  --y-font-mono: 'JetBrains Mono', monospace;
  --y-text-sm: 0.875rem;
  --y-text-base: 1rem;
  --y-text-lg: 1.125rem;
}

/* 第二层：语义 Token — 主题可切换 */
:root,
[data-theme="light"] {
  --y-color-primary: var(--y-blue-500);
  --y-color-primary-hover: var(--y-blue-600);
  --y-color-primary-active: var(--y-blue-700);
  --y-color-bg: #ffffff;
  --y-color-text: var(--y-gray-900);
  --y-color-border: var(--y-gray-200);
  --y-color-danger: var(--y-red-500);
  --y-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --y-shadow-md: 0 4px 6px rgba(0,0,0,0.07);
}

[data-theme="dark"] {
  --y-color-primary: var(--y-blue-400);
  --y-color-primary-hover: var(--y-blue-300);
  --y-color-bg: var(--y-gray-900);
  --y-color-text: var(--y-gray-50);
  --y-color-border: var(--y-gray-700);
  --y-shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --y-shadow-md: 0 4px 6px rgba(0,0,0,0.4);
}

/* 第三层：组件 Token — 每个组件独立，引用语义 Token */
:root {
  --y-btn-bg: var(--y-color-primary);
  --y-btn-bg-hover: var(--y-color-primary-hover);
  --y-btn-radius: var(--y-radius-4);
  --y-btn-padding-x: var(--y-space-4);
  --y-btn-padding-y: var(--y-space-2);
  --y-btn-font-size: var(--y-text-sm);
}
```

### 6.2 UnoCSS Preset 分发

```ts
// packages/uno-preset/src/preset.ts
import { definePreset } from 'unocss'

export const presetYui = definePreset({
  name: '@y-ui/uno-preset',
  rules: [
    // 按钮
    [/^y-btn--(\w+)$/, ([, variant]) => {
      const variants: Record<string, Record<string, string>> = {
        primary: { bg: 'var(--y-btn-bg)', color: '#fff' },
        secondary: { bg: 'var(--y-gray-100)', color: 'var(--y-gray-900)' },
        outline: { bg: 'transparent', border: '1px solid var(--y-color-border)' },
        ghost: { bg: 'transparent', color: 'var(--y-color-primary)' },
        danger: { bg: 'var(--y-color-danger)', color: '#fff' },
      }
      return variants[variant] || {}
    }],
    // 尺寸
    [/^y-btn--(sm|md|lg)$/, ([, size]) => {
      const sizes: Record<string, Record<string, string>> = {
        sm: { padding: '4px 8px', 'font-size': '0.75rem' },
        md: { padding: '8px 16px', 'font-size': '0.875rem' },
        lg: { padding: '12px 24px', 'font-size': '1rem' },
      }
      return sizes[size] || {}
    }],
  ],
  shortcuts: {
    'y-btn': 'inline-flex items-center justify-center rounded-[var(--y-btn-radius)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--y-color-primary)] disabled:opacity-50 disabled:pointer-events-none',
    'y-btn__spinner': 'animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full',
    'y-btn__label': 'inline-flex items-center gap-2',
  },
  theme: {
    // Token 映射到 UnoCSS theme，使 breakpoints 等可用
    breakpoints: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
})
```

消费者配置：

```ts
// uno.config.ts (消费者项目)
import { defineConfig } from 'unocss'
import { presetYui } from '@y-ui/uno-preset'

export default defineConfig({
  presets: [
    presetYui(),
    // 可叠加其他 preset
  ],
})
```

### 6.3 样式隔离策略

**不使用 Shadow DOM**。原因：
- Shadow DOM 阻止外部 UnoCSS 扫描和样式穿透
- 与原子化 CSS 不兼容
- 增加运行时开销

**替代方案：`y-` 命名空间前缀**
- 所有组件 class 以 `y-` 开头（`y-btn`, `y-select`, `y-dialog`）
- 与消费者代码零冲突概率
- UnoCSS 可正常扫描和生成

---

## 7. 组件设计模式

### 7.1 Mitosis 组件示例 (Button)

```tsx
// packages/components/src/button/button.tsx
import { Show, Slot } from '@builder.io/mitosis'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  block?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  icon?: string
  children?: any
}

export default function YButton(props: ButtonProps) {
  return (
    <button
      type={props.htmlType || 'button'}
      disabled={props.disabled || props.loading}
      aria-disabled={props.disabled || props.loading || undefined}
      aria-busy={props.loading || undefined}
      class={`y-btn y-btn--${props.variant || 'primary'} y-btn--${props.size || 'md'} ${props.block ? 'y-btn--block' : ''}`}
    >
      <Show when={props.loading}>
        <span aria-hidden="true" class="y-btn__spinner" />
        <span class="sr-only">{props.loadingText || '加载中'}</span>
      </Show>
      <span class="y-btn__label">
        <Slot />
      </span>
    </button>
  )
}
```

### 7.2 组件 API 设计原则

| 原则 | 说明 |
|------|------|
| **受控 + 非受控双模式** | 提供 `value` + `onUpdateValue`（受控），也提供 `defaultValue`（非受控） |
| **组合优于配置** | 复杂组件用 `<YSelect><YSelect.Option /></YSelect>` 组合模式 |
| **转发原生属性** | `...restProps` 透传到原生元素，保持 HTML 语义完整 |
| **asChild 模式** | 关键组件支持 `asChild` 渲染为自定义元素（类似 Radix） |
| **TypeScript 严格** | 所有 Props 接口导出，泛型覆盖（Select<T>、Table<T>） |

---

## 8. 无障碍系统 (a11y)

### 8.1 ARIA 状态机

每个有交互的组件在 Core 层定义纯 FSM：

```ts
// packages/core/src/machines/select.ts
export type SelectState =
  | { type: 'closed' }
  | { type: 'open'; highlightedIndex: number }

export type SelectEvent =
  | { type: 'TOGGLE' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'ARROW_DOWN' }
  | { type: 'ARROW_UP' }
  | { type: 'ENTER' }
  | { type: 'ESCAPE' }
  | { type: 'TYPEAHEAD'; char: string }
  | { type: 'HOME' }
  | { type: 'END' }

export function selectTransition(
  state: SelectState,
  event: SelectEvent,
  context: SelectContext,
): SelectState {
  switch (state.type) {
    case 'closed':
      if (event.type === 'TOGGLE' || event.type === 'ARROW_DOWN') {
        return { type: 'open', highlightedIndex: 0 }
      }
      return state

    case 'open':
      switch (event.type) {
        case 'ESCAPE':
        case 'CLOSE':
          return { type: 'closed' }
        case 'ARROW_DOWN':
          return {
            ...state,
            highlightedIndex: Math.min(state.highlightedIndex + 1, context.options.length - 1),
          }
        case 'ARROW_UP':
          return {
            ...state,
            highlightedIndex: Math.max(state.highlightedIndex - 1, 0),
          }
        case 'ENTER':
          return { type: 'closed' } // + 触发 onSelect callback
        default:
          return state
      }
  }
}
```

### 8.2 ARIA 属性派生

```ts
// packages/core/src/aria/select-aria.ts
export function selectAriaAttributes(
  state: SelectState,
  context: SelectContext,
) {
  const baseId = context.id || 'y-select'

  return {
    trigger: {
      role: 'combobox',
      'aria-expanded': state.type === 'open',
      'aria-haspopup': 'listbox',
      'aria-controls': `${baseId}-listbox`,
      'aria-activedescendant':
        state.type === 'open'
          ? `${baseId}-option-${state.highlightedIndex}`
          : undefined,
    },
    listbox: {
      role: 'listbox',
      id: `${baseId}-listbox`,
      'aria-label': context.label,
    },
    option: (index: number) => ({
      role: 'option',
      id: `${baseId}-option-${index}`,
      'aria-selected': state.type === 'open' && state.highlightedIndex === index,
    }),
  }
}
```

### 8.3 焦点管理

焦点管理放在**框架适配层**（Mitosis 没有 DOM ref 抽象）：

```ts
// packages/react/src/hooks/useFocusTrap.ts
export function useFocusTrap(containerRef: RefObject<HTMLElement>, active: boolean) {
  useEffect(() => {
    if (!active || !containerRef.current) return

    const container = containerRef.current
    const focusable = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    first?.focus()

    return () => container.removeEventListener('keydown', handleKeyDown)
  }, [active, containerRef])
}
```

### 8.4 键盘导航模式

| 模式 | 适用组件 | 说明 |
|------|---------|------|
| **Roving Tabindex** | Tabs, RadioGroup, MenuBar | 当前激活项 `tabindex=0`，其余 `tabindex=-1` |
| **Focus Trap** | Dialog, Modal, Drawer | Tab 循环限制在容器内 |
| **Virtual Cursor** (aria-activedescendant) | Select, Combobox, Listbox | 焦点在 trigger 上，通过 aria-activedescendant 指示高亮项 |

---

## 9. 动画与过渡系统

### 9.1 动画 Token

```css
/* packages/tokens/src/animations.css */
:root {
  /* 时长 */
  --y-duration-instant: 50ms;
  --y-duration-fast: 150ms;
  --y-duration-normal: 250ms;
  --y-duration-slow: 400ms;

  /* 缓动 */
  --y-ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --y-ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --y-ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --y-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* 偏好减少动画 */
  @media (prefers-reduced-motion: reduce) {
    --y-duration-fast: 0ms;
    --y-duration-normal: 0ms;
    --y-duration-slow: 0ms;
  }
}
```

### 9.2 CSS 优先策略

| 场景 | 方案 | 实现 |
|------|------|------|
| 展开/折叠 | CSS Grid Trick | `grid-template-rows: 0fr → 1fr` + `transition` |
| 淡入淡出 | CSS opacity + transition | `opacity: 0 → 1` |
| 滑入滑出 | CSS transform + transition | `transform: translateY(-10px) → 0` |
| 列表重排 | FLIP 动画 | JS 计算位移 → `transform` + `transition` |
| 加载旋转 | CSS @keyframes | `@keyframes spin { to { transform: rotate(360deg) } }` |

### 9.3 Grid Trick 展开/折叠

```css
.y-collapse {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--y-duration-normal) var(--y-ease-enter);
}

.y-collapse[data-open] {
  grid-template-rows: 1fr;
}

.y-collapse__inner {
  overflow: hidden;
  /* 内容区实际高度由内容撑开，外层 grid row 从 0fr 过渡到 1fr */
}
```

### 9.4 FLIP 动画（列表重排）

```ts
// packages/core/src/utils/flip.ts
export function flipAnimate(
  container: HTMLElement,
  items: HTMLElement[],
  duration = 250,
) {
  // First: 记录当前位置
  const first = new Map(items.map(item => [
    item.dataset.id,
    item.getBoundingClientRect(),
  ]))

  // 等待 DOM 更新（下一帧）
  requestAnimationFrame(() => {
    // Last: 获取新位置
    items.forEach(item => {
      const id = item.dataset.id!
      const firstRect = first.get(id)
      if (!firstRect) return

      const lastRect = item.getBoundingClientRect()

      // Invert: 计算位移
      const dx = firstRect.left - lastRect.left
      const dy = firstRect.top - lastRect.top

      if (dx === 0 && dy === 0) return

      // Play: 从位移过渡到原位
      item.style.transform = `translate(${dx}px, ${dy}px)`
      item.style.transition = 'none'

      requestAnimationFrame(() => {
        item.style.transition = `transform ${duration}ms var(--y-ease-enter)`
        item.style.transform = ''
      })
    })
  })
}
```

---

## 10. 虚拟滚动

### 10.1 PositionList 数据结构

```ts
// packages/core/src/utils/position-list.ts
export class PositionList {
  private blockSize: number  // √n
  private heights: Float64Array
  private blockSums: Float64Array
  private count: number

  constructor(initialCount: number, defaultHeight: number) {
    this.count = initialCount
    this.blockSize = Math.ceil(Math.sqrt(initialCount))
    this.heights = new Float64Array(initialCount).fill(defaultHeight)
    this.blockSums = new Float64Array(
      Math.ceil(initialCount / this.blockSize)
    ).fill(defaultHeight * this.blockSize)
  }

  /** 获取第 index 项的顶部偏移量 — O(√n) */
  getOffset(index: number): number {
    const blockIndex = Math.floor(index / this.blockSize)
    let offset = 0

    // 累加前面完整 block 的和
    for (let b = 0; b < blockIndex; b++) {
      offset += this.blockSums[b]
    }

    // 累加当前 block 内前面各项
    for (let i = blockIndex * this.blockSize; i < index; i++) {
      offset += this.heights[i]
    }

    return offset
  }

  /** 更新某项高度 — O(1) */
  update(index: number, height: number): void {
    const blockIndex = Math.floor(index / this.blockSize)
    const diff = height - this.heights[index]
    this.heights[index] = height
    this.blockSums[blockIndex] += diff
  }

  /** 根据滚动偏移查找对应项索引 — O(√n) */
  findIndex(offset: number): number {
    let remaining = offset
    let blockIndex = 0

    // 跳过完整 block
    while (blockIndex < this.blockSums.length && remaining >= this.blockSums[blockIndex]) {
      remaining -= this.blockSums[blockIndex]
      blockIndex++
    }

    // 在 block 内线性查找
    const start = blockIndex * this.blockSize
    for (let i = start; i < Math.min(start + this.blockSize, this.count); i++) {
      if (remaining < this.heights[i]) return i
      remaining -= this.heights[i]
    }

    return this.count - 1
  }

  /** 总高度 */
  getTotalHeight(): number {
    let total = 0
    for (let b = 0; b < this.blockSums.length; b++) {
      total += this.blockSums[b]
    }
    return total
  }
}
```

### 10.2 渲染策略

```
┌─────────────────────────────────┐
│         totalHeight px          │  ← 撑开滚动容器
│  ┌───────────────────────────┐  │
│  │  paddingTop (offset)      │  │  ← 偏移占位
│  ├───────────────────────────┤  │
│  │                           │  │
│  │   可见区域 (overscan ±5)   │  │  ← 只渲染这些项
│  │                           │  │
│  ├───────────────────────────┤  │
│  │  paddingBottom            │  │  ← 底部占位
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### 10.3 动态高度校正

当已测量的项高度变化时，视口上方的项高度变化会导致 scrollTop 跳动：

```ts
function onItemHeightChange(index: number, newHeight: number) {
  const oldHeight = positionList.heights[index]
  positionList.update(index, newHeight)

  // 如果变化项在视口上方，校正 scrollTop
  const firstVisibleIndex = positionList.findIndex(scrollTop)
  if (index < firstVisibleIndex) {
    const diff = newHeight - oldHeight
    scrollContainer.scrollTop += diff
  }
}
```

---

## 11. Headless Hooks 架构

### 11.1 三层分离

```
┌─────────────────────────────────────────────┐
│  Core 层 (@y-ui/core)                       │
│  纯 TS，无框架依赖                            │
│  - selectTransition(state, event, context)   │
│  - selectAriaAttributes(state, context)      │
│  - PositionList, focusTrap, keyboardNav      │
├─────────────────────────────────────────────┤
│  Hooks 定义层 (@y-ui/hooks)                  │
│  框架无关的 hook 接口定义                       │
│  - SelectHookConfig, SelectHookReturn        │
│  - DialogHookConfig, DialogHookReturn        │
├─────────────────────────────────────────────┤
│  Adapter 层 (@y-ui/react, vue, svelte)       │
│  框架特定实现                                  │
│  - useSelect() — React useReducer            │
│  - useSelect() — Vue ref + watchEffect       │
│  - useSelect() — Svelte writable store       │
└─────────────────────────────────────────────┘
```

### 11.2 React Hook 示例

```ts
// packages/react/src/hooks/useSelect.ts
import { useReducer, useCallback, useMemo } from 'react'
import { selectTransition, selectAriaAttributes } from '@y-ui/core'

export function useSelect<T>(config: {
  options: T[]
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
  id?: string
}) {
  const context = useMemo(() => ({
    options: config.options,
    id: config.id || 'y-select',
    label: config.label,
  }), [config.options, config.id, config.label])

  const [state, dispatch] = useReducer(
    (s: SelectState, e: SelectEvent) => selectTransition(s, e, context),
    { type: 'closed' },
  )

  const aria = useMemo(
    () => selectAriaAttributes(state, context),
    [state, context],
  )

  const triggerProps = useMemo(() => ({
    ...aria.trigger,
    onClick: () => dispatch({ type: 'TOGGLE' }),
    onKeyDown: (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown': e.preventDefault(); dispatch({ type: 'ARROW_DOWN' }); break
        case 'ArrowUp': e.preventDefault(); dispatch({ type: 'ARROW_UP' }); break
        case 'Enter': e.preventDefault(); dispatch({ type: 'ENTER' }); break
        case 'Escape': dispatch({ type: 'ESCAPE' }); break
      }
    },
  }), [aria.trigger])

  const listboxProps = useMemo(() => ({
    ...aria.listbox,
  }), [aria.listbox])

  const getOptionProps = useCallback((index: number) => ({
    ...aria.option(index),
    onClick: () => {
      config.onChange?.(config.options[index])
      dispatch({ type: 'ENTER' })
    },
  }), [aria, config.options, config.onChange])

  return {
    state,
    isOpen: state.type === 'open',
    highlightedIndex: state.type === 'open' ? state.highlightedIndex : -1,
    triggerProps,
    listboxProps,
    getOptionProps,
    dispatch,
  }
}
```

---

## 12. SSR 兼容策略

### 12.1 原则

- **服务端**：渲染静态 HTML 骨架，所有交互状态为初始值
- **客户端**：hydrate 后激活完整交互能力

### 12.2 SSR-safe 模式

```ts
// 断点检测 — SSR 时默认 'base'
const [currentBp, setCurrentBp] = useState<Breakpoint | 'base'>('base')
useEffect(() => {
  // 仅在客户端执行
  setCurrentBp(detectBreakpoint())
  // ... matchMedia listeners
}, [])

// 焦点管理 — SSR 时跳过
useEffect(() => {
  if (!containerRef.current) return
  // focus trap logic...
}, [active])

// 虚拟滚动 — SSR 时渲染前 N 项静态列表
const items = isServer
  ? allItems.slice(0, 20) // 静态降级
  : virtualItems          // 客户端完整虚拟滚动
```

### 12.3 Hydration Mismatch 防护

```tsx
// 使用 mount 状态避免 SSR/CSR 不一致
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])

// 只在客户端渲染依赖浏览器 API 的内容
{mounted && <ClientOnlyContent />}
```

---

## 13. 表单集成

### 13.1 组件标准接口

所有表单组件暴露统一接口：

```ts
interface FormFieldProps<T> {
  name: string
  value?: T
  defaultValue?: T
  onUpdateValue?: (value: T) => void
  error?: string
  disabled?: boolean
  required?: boolean
  // ARIA
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}
```

### 13.2 React Hook Form Adapter

```ts
// packages/react/src/adapters/rhf-adapter.ts
import { useFormContext, Controller } from 'react-hook-form'

export function createFormField<T>(Component: ComponentType<FormFieldProps<T>>) {
  return function FormField(props: {
    name: string
    rules?: RegisterOptions
    label?: string
  }) {
    const { control } = useFormContext()

    return (
      <Controller
        name={props.name}
        control={control}
        rules={props.rules}
        render={({ field, fieldState }) => (
          <Component
            {...field}
            onChange={field.onBlur} // RHF uses onChange for value
            value={field.value}
            error={fieldState.error?.message}
            aria-invalid={!!fieldState.error}
            aria-describedby={fieldState.error ? `${props.name}-error` : undefined}
          />
        )}
      />
    )
  }
}

// 使用
const YSelectField = createFormField(YSelect)
// <YSelectField name="country" rules={{ required: '请选择国家' }} />
```

### 13.3 VeeValidate Adapter (Vue)

```ts
// packages/vue/src/adapters/vee-validate-adapter.ts
import { useField } from 'vee-validate'

export function createFormField<T>(Component: Component) {
  return {
    setup(props: { name: string; label?: string }) {
      const { value, errorMessage, meta, handleChange, handleBlur } = useField<T>(
        () => props.name,
        undefined,
        { syncVModel: false },
      )

      return () => h(Component, {
        name: props.name,
        modelValue: value.value,
        'onUpdate:modelValue': handleChange,
        onBlur: handleBlur,
        error: errorMessage.value,
        'aria-invalid': !meta.valid,
      })
    },
  }
}
```

---

## 14. 图标系统

### 14.1 图标数据格式

```ts
// packages/icons/src/types.ts
export interface IconData {
  name: string
  viewBox: string        // e.g. "0 0 24 24"
  paths: string[]        // SVG path d 属性
  strokeLinecap?: 'butt' | 'round' | 'square'
  strokeLinejoin?: 'miter' | 'round' | 'bevel'
  defaultStrokeWidth?: number
}
```

### 14.2 核心图标定义

```ts
// packages/icons/src/core-icons.ts
export const icons: Record<string, IconData> = {
  'chevron-down': {
    name: 'chevron-down',
    viewBox: '0 0 24 24',
    paths: ['M6 9l6 6 6-6'],
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    defaultStrokeWidth: 2,
  },
  'x': {
    name: 'x',
    viewBox: '0 0 24 24',
    paths: ['M18 6L6 18', 'M6 6l12 12'],
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    defaultStrokeWidth: 2,
  },
  'check': {
    name: 'check',
    viewBox: '0 0 24 24',
    paths: ['M20 6L9 17l-5-5'],
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    defaultStrokeWidth: 2,
  },
  // ... ~40 核心图标
}
```

### 14.3 图标渲染器

```tsx
// React 版本
export function YIcon(props: { name: string; size?: number | string; color?: string }) {
  const data = icons[props.name]
  if (!data) return null

  return (
    <svg
      viewBox={data.viewBox}
      width={props.size || '1em'}
      height={props.size || '1em'}
      fill="none"
      stroke={props.color || 'currentColor'}
      strokeWidth={data.defaultStrokeWidth || 2}
      strokeLinecap={data.strokeLinecap || 'butt'}
      strokeLinejoin={data.strokeLinejoin || 'miter'}
      aria-hidden="true"
    >
      {data.paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  )
}
```

### 14.4 Lucide 扩展

```ts
// 消费者可以桥接 Lucide 图标到 YIcon 格式
import { icons as lucideIcons } from 'lucide-static'

function adaptLucide(name: string): IconData {
  const svg = lucideIcons[name]
  // 解析 SVG 字符串 → IconData 对象
  return parseSvgToIconData(svg)
}
```

---

## 15. CLI 工具

### 15.1 命令设计

```bash
# 初始化项目配置
npx y-ui init

# 添加组件（本地模式 — 复制源码到项目）
npx y-ui add button
npx y-ui add select dialog

# 列出可用组件
npx y-ui list

# 更新已安装的组件
npx y-ui update

# CDN 模式：生成 Import Map 配置
npx y-ui cdn init
npx y-ui cdn add button select
```

### 15.2 本地模式 vs CDN 模式

| 模式 | 适用场景 | 行为 |
|------|---------|------|
| **本地模式** | 需要深度定制、Tree-shaking | 复制源码到 `src/components/ui/`，可修改 |
| **CDN 模式** | 快速原型、轻量使用 | 生成 Import Map，运行时从 CDN 加载 |

### 15.3 依赖解析

```ts
// packages/cli/src/resolver.ts
const dependencyGraph: Record<string, string[]> = {
  'button': [],
  'input': [],
  'select': ['button', 'icons'],
  'dialog': ['icons'],
  'tabs': [],
  'virtual-list': [],
  'form-field': ['input', 'select'],
}

function resolveDependencies(components: string[]): string[] {
  const resolved = new Set<string>()
  const stack = [...components]

  while (stack.length) {
    const comp = stack.pop()!
    if (resolved.has(comp)) continue
    resolved.add(comp)
    const deps = dependencyGraph[comp] || []
    stack.push(...deps)
  }

  return [...resolved]
}
```

---

## 16. 响应式系统

### 16.1 断点定义

```ts
// packages/core/src/breakpoints.ts
export const breakpoints = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
} as const
```

### 16.2 混合策略

| 层级 | 做法 | 理由 |
|------|------|------|
| 布局组件 (Grid, Flex, Stack) | 响应式 props（对象语法） | 核心价值，值得运行时开销 |
| 通用组件 (Button, Input) | 纯 class，不处理响应式 | 保持轻量 |
| 响应式工具组件 | `<YHide>` `<YShow>` `<YContainer>` | 声明式语法 |

### 16.3 响应式 Props 解析

```ts
function resolveResponsiveProp(
  prop: string | number | Record<string, string | number>,
  prefix: string,
): string {
  if (typeof prop !== 'object') return `${prefix}-${prop}`
  return Object.entries(prop)
    .map(([bp, val]) =>
      bp === 'base' ? `${prefix}-${val}` : `${bp}:${prefix}-${val}`
    )
    .join(' ')
}

// cols={{ base: 1, md: 3 }} → "y-grid-cols-1 md:y-grid-cols-3"
```

### 16.4 Container Query

- 默认使用 Media Query（零成本）
- 布局容器内部使用 Container Query（需声明 `y-container`）
- `<YHide below="md">` 内部用 Media Query
- Card 内部响应式布局用 Container Query

---

## 17. 国际化 (i18n)

### 17.1 策略

组件库内置文案极少（仅 `loading`、`no data`、`close` 等），采用 **Provider 注入** 模式：

```ts
// packages/core/src/locale.ts
export interface YUILocale {
  loading: string
  noData: string
  close: string
  confirm: string
  cancel: string
  search: string
  select: { placeholder: string; noMatch: string }
  pagination: { total: (count: number) => string; goto: string }
  upload: { dragText: string; clickText: string }
}

export const defaultLocale: YUILocale = {
  loading: '加载中',
  noData: '暂无数据',
  close: '关闭',
  confirm: '确认',
  cancel: '取消',
  search: '搜索',
  select: { placeholder: '请选择', noMatch: '无匹配数据' },
  pagination: { total: (count) => `共 ${count} 条`, goto: '前往' },
  upload: { dragText: '拖拽文件到此处', clickText: '点击上传' },
}
```

### 17.2 Provider 模式

```tsx
// React
<YUIProvider locale={zhCN}>
  <App />
</YUIProvider>

// 组件内部
function useLocale() {
  return useContext(YUIContext)?.locale || defaultLocale
}
```

---

## 18. 主题系统

### 18.1 切换方式

通过 `data-theme` 属性切换，CSS 变量自动响应：

```html
<html data-theme="dark">
```

```ts
function setTheme(theme: 'light' | 'dark' | string) {
  document.documentElement.setAttribute('data-theme', theme)
}
```

### 18.2 自定义主题

消费者可以覆盖任意 Token：

```css
/* 品牌主题 */
:root[data-theme="brand"] {
  --y-color-primary: #8b5cf6;        /* 紫色品牌色 */
  --y-color-primary-hover: #7c3aed;
  --y-btn-radius: 9999px;             /* 圆角按钮 */
  --y-font-sans: 'Poppins', sans-serif;
}
```

---

## 19. 版本发布策略

### 19.1 全局统一版本

所有 `@y-ui/*` 包共享同一版本号（类似 Angular、Vue 生态）：

```
@y-ui/core@1.2.0
@y-ui/react@1.2.0
@y-ui/vue@1.2.0
@y-ui/svelte@1.2.0
@y-ui/tokens@1.2.0
@y-ui/icons@1.2.0
@y-ui/uno-preset@1.2.0
@y-ui/hooks@1.2.0
y-ui-cli@1.2.0
```

### 19.2 Changeset 管理

使用 `@changesets/cli` 管理版本：

```bash
# 开发时记录变更
npx changeset add

# 发布时统一升版
npx changeset version
npx changeset publish
```

---

## 20. 实施路线

### Phase 1：骨架搭建 (Week 1-2)

- [ ] Monorepo 初始化 (pnpm workspace + turborepo)
- [ ] Mitosis 编译管线配置
- [ ] Vite 多入口构建配置
- [ ] Button 组件全链路验证 (源码 → Mitosis 编译 → 三框架输出 → ESM 构建 → CDN 加载)
- [ ] UnoCSS Preset 基础配置
- [ ] 三层 Token 基础变量

### Phase 2：核心组件 (Week 3-6)

- [ ] Input, Select, Checkbox, Radio
- [ ] Dialog, Drawer, Popover, Tooltip
- [ ] Tabs, Accordion
- [ ] 表单验证 Adapter (RHF + VeeValidate)
- [ ] a11y 全面审计

### Phase 3：高级组件 (Week 7-10)

- [ ] Table (排序、筛选、分页)
- [ ] VirtualList
- [ ] DatePicker, TimePicker
- [ ] Upload
- [ ] 动画系统完善

### Phase 4：生态工具 (Week 11-12)

- [ ] CLI 工具
- [ ] 文档站
- [ ] 图标系统完善
- [ ] SSR 适配验证
- [ ] 性能基准测试

---

## 附录 A：关键决策记录

| 决策 | 选择 | 否决方案 | 理由 |
|------|------|---------|------|
| 跨框架 | Mitosis 编译时 | Web Components / 运行时适配 | 零运行时开销 |
| 样式 | UnoCSS Preset | CSS Modules / CSS-in-JS / Shadow DOM | 原子化 + 按需 + 无运行时 |
| 模块分发 | 原生 ESM + Import Map | Module Federation | 零运行时，更轻量 |
| 状态管理 | 纯 TS FSM | XState / 框架特定 | 框架无关，极小体积 |
| 样式隔离 | `y-` 前缀 | Shadow DOM | 兼容原子化 CSS |
| 动画 | CSS 优先 + FLIP | 纯 JS 动画库 | 零依赖，GPU 加速 |
| 虚拟滚动 | PositionList 前缀和 | 二分查找 / 简单数组 | O(√n) 动态高度最优解 |
| 版本管理 | 全局统一版本 | 独立版本 | 消费者无需处理兼容性矩阵 |
