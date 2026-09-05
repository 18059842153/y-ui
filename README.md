# Y-UI

跨框架、网络级按需加载的轻量组件库。

一套组件源码，通过 Mitosis 编译输出 Vue / React / Svelte 三个版本。每个组件作为独立 ESM 文件通过 CDN 分发，浏览器原生加载，按需引入，跨项目缓存复用。

---

## 特性

- **跨框架** — 一套源码，编译输出 React / Vue / Svelte
- **网络级按需加载** — 每个组件独立 ESM 文件，用多少加载多少
- **零运行时** — 原生 ESM + Import Map，不依赖 Module Federation
- **原子化样式** — UnoCSS Preset 分发，按需生成，无 CSS-in-JS 运行时
- **三层 Token** — 全局 → 语义 → 组件，主题切换一行代码
- **无障碍优先** — WAI-ARIA 状态机、焦点管理、键盘导航全覆盖
- **SSR 兼容** — 服务端降级渲染，客户端渐进增强
- **表单集成** — 官方 React Hook Form / VeeValidate 适配器
- **极小体积** — 单组件 ~2-5KB (gzip)

---

## 快速开始

### 方式一：CDN 模式（推荐快速上手）

在 HTML 中添加 Import Map，锁定版本：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>My App</title>

  <!-- Y-UI Token 样式 -->
  <link rel="stylesheet" href="https://cdn.y-ui.com/tokens/1.0.0/global.css" />
  <link rel="stylesheet" href="https://cdn.y-ui.com/tokens/1.0.0/semantic.css" />

  <!-- Import Map 锁定版本 -->
  <script type="importmap">
  {
    "imports": {
      "@y-ui/react/": "https://cdn.y-ui.com/react/1.0.0/",
      "@y-ui/tokens/": "https://cdn.y-ui.com/tokens/1.0.0/",
      "@y-ui/core/": "https://cdn.y-ui.com/core/1.0.0/"
    }
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

然后在代码中按需引入：

```tsx
// 只加载 Button — 约 3KB gzip
import { YButton } from '@y-ui/react/button'

function App() {
  return (
    <YButton variant="primary" size="md">
      点击我
    </YButton>
  )
}
```

### 方式二：npm 安装

```bash
# React
npm install @y-ui/react @y-ui/tokens @y-ui/uno-preset

# Vue
npm install @y-ui/vue @y-ui/tokens @y-ui/uno-preset

# Svelte
npm install @y-ui/svelte @y-ui/tokens @y-ui/uno-preset
```

配置 UnoCSS Preset：

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import { presetYui } from '@y-ui/uno-preset'

export default defineConfig({
  presets: [presetYui()],
})
```

引入 Token 样式：

```ts
// main.tsx
import '@y-ui/tokens/global.css'
import '@y-ui/tokens/semantic.css'
import '@y-ui/tokens/animations.css'
```

### 方式三：CLI 本地模式（需要深度定制）

```bash
# 初始化
npx y-ui init

# 添加组件源码到项目
npx y-ui add button
npx y-ui add select dialog

# 组件会被复制到 src/components/ui/ 目录，可自由修改
```

---

## 框架使用

### React

```tsx
import { YButton } from '@y-ui/react/button'
import { YSelect } from '@y-ui/react/select'
import { YDialog } from '@y-ui/react/dialog'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <YButton variant="primary" onClick={() => setOpen(true)}>
        打开对话框
      </YButton>

      <YDialog open={open} onClose={() => setOpen(false)} title="确认操作">
        <p>确定要执行此操作吗？</p>
        <YDialog.Footer>
          <YButton variant="outline" onClick={() => setOpen(false)}>
            取消
          </YButton>
          <YButton variant="primary" onClick={handleConfirm}>
            确认
          </YButton>
        </YDialog.Footer>
      </YDialog>
    </>
  )
}
```

**Headless Hook 用法：**

```tsx
import { useSelect } from '@y-ui/react/hooks'

function MySelect() {
  const options = ['Apple', 'Banana', 'Cherry']
  const { isOpen, triggerProps, listboxProps, getOptionProps } = useSelect({
    options,
    onChange: (value) => console.log('Selected:', value),
  })

  return (
    <div>
      <button {...triggerProps}>选择水果</button>
      {isOpen && (
        <ul {...listboxProps}>
          {options.map((opt, i) => (
            <li key={opt} {...getOptionProps(i)}>{opt}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### Vue

```vue
<script setup>
import { YButton } from '@y-ui/vue/button'
import { YSelect } from '@y-ui/vue/select'
import { ref } from 'vue'

const selected = ref('')
const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]
</script>

<template>
  <YSelect
    v-model="selected"
    :options="options"
    placeholder="请选择水果"
  />
  <YButton variant="primary" :disabled="!selected">
    提交
  </YButton>
</template>
```

**Composable 用法：**

```vue
<script setup>
import { useSelect } from '@y-ui/vue/composables'

const options = ['Apple', 'Banana', 'Cherry']
const { isOpen, triggerProps, listboxProps, getOptionProps } = useSelect({
  options,
  onChange: (value) => console.log('Selected:', value),
})
</script>

<template>
  <button v-bind="triggerProps">选择水果</button>
  <ul v-if="isOpen" v-bind="listboxProps">
    <li
      v-for="(opt, i) in options"
      :key="opt"
      v-bind="getOptionProps(i)"
    >
      {{ opt }}
    </li>
  </ul>
</template>
```

### Svelte

```svelte
<script>
  import { YButton } from '@y-ui/svelte/button'
  import { YSelect } from '@y-ui/svelte/select'

  let selected = ''
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ]
</script>

<YSelect
  bind:value={selected}
  {options}
  placeholder="请选择水果"
/>
<YButton variant="primary" disabled={!selected}>
  提交
</YButton>
```

---

## 主题切换

Y-UI 通过 CSS 变量 + `data-theme` 属性实现主题切换，无需 JavaScript 运行时：

```html
<!-- 亮色主题（默认） -->
<html data-theme="light">

<!-- 暗色主题 -->
<html data-theme="dark">
```

```ts
// 切换主题
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme')
  const next = current === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
}
```

**自定义品牌主题：**

```css
:root[data-theme="brand"] {
  --y-color-primary: #8b5cf6;
  --y-color-primary-hover: #7c3aed;
  --y-btn-radius: 9999px;
  --y-font-sans: 'Poppins', sans-serif;
}
```

---

## 国际化

```tsx
import { YUIProvider } from '@y-ui/react/provider'
import { enUS } from '@y-ui/react/locale'

function App() {
  return (
    <YUIProvider locale={enUS}>
      <MyApp />
    </YUIProvider>
  )
}
```

内置语言包：`zh-CN`（默认）、`en-US`。可自定义扩展。

---

## 表单集成

### React Hook Form

```tsx
import { useForm, FormProvider } from 'react-hook-form'
import { YInputField, YSelectField } from '@y-ui/react/adapters/rhf'

function SignUpForm() {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <YInputField
          name="email"
          label="邮箱"
          rules={{ required: '请输入邮箱' }}
        />
        <YSelectField
          name="role"
          label="角色"
          options={roleOptions}
          rules={{ required: '请选择角色' }}
        />
        <YButton type="submit" variant="primary">
          注册
        </YButton>
      </form>
    </FormProvider>
  )
}
```

### VeeValidate (Vue)

```vue
<script setup>
import { useForm } from 'vee-validate'
import { YInputField, YSelectField } from '@y-ui/vue/adapters/vee-validate'

const { handleSubmit } = useForm()
const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <form @submit="onSubmit">
    <YInputField
      name="email"
      label="邮箱"
      :rules="{ required: true, email: true }"
    />
    <YButton type="submit" variant="primary">提交</YButton>
  </form>
</template>
```

---

## 图标

```tsx
import { YIcon } from '@y-ui/react/icon'

// 使用核心图标
<YIcon name="chevron-down" size={16} />
<YIcon name="check" size={20} color="green" />
<YIcon name="x" size={16} />

// 在按钮中使用
<YButton icon="chevron-down" variant="outline">
  展开
</YButton>
```

核心图标约 40 个（箭头、关闭、检查、搜索、加载等）。需要更多图标可桥接 [Lucide](https://lucide.dev/)：

```ts
import { adaptLucide } from '@y-ui/react/icon'
import { Home } from 'lucide-react'

const homeIcon = adaptLucide(Home)
```

---

## 响应式

### 布局组件响应式 Props

```tsx
<YGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
  <YCard>...</YCard>
  <YCard>...</YCard>
  <YCard>...</YCard>
</YGrid>
```

### 工具组件

```tsx
// md 断点以下隐藏
<YHide below="md">
  <SidebarNav />
</YHide>

// lg 断点以上显示
<YShow above="lg">
  <DesktopToolbar />
</YShow>
```

### 通用组件用 UnoCSS 响应式前缀

```tsx
<YButton class="y-btn--sm md:y-btn--md lg:y-btn--lg">
  响应式按钮
</YButton>
```

---

## 无障碍

所有交互组件内置完整的无障碍支持：

- **ARIA 属性** — 自动根据状态派生正确的 ARIA 属性
- **键盘导航** — 完整的键盘操作支持
- **焦点管理** — Dialog 焦点陷阱、焦点恢复
- **屏幕阅读器** — `sr-only` 文本、`aria-live` 区域

| 组件 | 键盘操作 |
|------|---------|
| Button | `Enter` / `Space` 激活 |
| Select | `↑↓` 导航、`Enter` 选择、`Esc` 关闭、首字母跳转 |
| Dialog | `Tab` 循环、`Esc` 关闭、打开时焦点陷阱 |
| Tabs | `←→` 切换标签（Roving Tabindex） |
| Menu | `↑↓` 导航、`Enter` / `Space` 激活、`Esc` 关闭 |

---

## 虚拟滚动

用于大数据量列表，支持动态行高：

```tsx
import { YVirtualList } from '@y-ui/react/virtual-list'

function BigList({ items }) {
  return (
    <YVirtualList
      items={items}
      estimatedHeight={48}
      overscan={5}
      renderItem={(item, index) => (
        <div class="y-p-3 y-border-b">
          #{index + 1} {item.name}
        </div>
      )}
    />
  )
}
```

---

## SSR 兼容

所有组件支持 SSR。服务端渲染静态骨架，客户端 hydrate 后激活交互：

```tsx
// Next.js / Nuxt / SvelteKit 中直接使用
import { YSelect } from '@y-ui/react/select'

// 服务端：渲染静态 HTML
// 客户端：hydrate 后完整交互（键盘导航、搜索、虚拟滚动等）
```

---

## CLI 工具

```bash
# 初始化项目配置
npx y-ui init

# 添加组件（本地源码模式）
npx y-ui add button select dialog

# 列出所有可用组件
npx y-ui list

# 更新已安装的组件
npx y-ui update

# CDN 模式
npx y-ui cdn init          # 生成 Import Map 配置
npx y-ui cdn add button    # 添加 CDN 组件引用
```

---

## 浏览器兼容

| 特性 | 要求 |
|------|------|
| ESM | ES2020+ (95%+ 浏览器) |
| Import Map | Chrome 89+, Firefox 108+, Safari 16.4+ |
| CSS Container Query | Chrome 105+, Firefox 110+, Safari 16+ |
| CSS Grid | 全版本支持 |

对于不支持 Import Map 的浏览器，提供 [es-module-shims](https://github.com/nicolo-ribaudo/es-module-shims) polyfill。

---

## 项目结构

```
y-ui/
├── packages/
│   ├── core/           # Headless Core: FSM + ARIA + 工具函数
│   ├── components/     # Mitosis 组件源码
│   ├── react/          # React 编译输出
│   ├── vue/            # Vue 编译输出
│   ├── svelte/         # Svelte 编译输出
│   ├── tokens/         # 设计 Token (CSS 变量)
│   ├── uno-preset/     # UnoCSS Preset
│   ├── hooks/          # Headless Hooks 接口定义
│   ├── icons/          # 图标数据 + 渲染器
│   └── cli/            # CLI 工具
├── apps/
│   ├── docs/           # 文档站
│   └── playground/     # 开发调试
└── scripts/            # 构建 + 发布脚本
```

---

## 技术栈

| 领域 | 选型 |
|------|------|
| 跨框架编译 | Mitosis |
| 样式方案 | UnoCSS |
| 构建工具 | Vite 4 + Rollup |
| 模块分发 | 原生 ESM + Import Map |
| 状态管理 | 纯 TS FSM |
| 包管理 | pnpm workspace + Turborepo |
| 类型系统 | TypeScript 5 |
| 版本管理 | Changesets |

---

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式（监听文件变化，实时编译）
pnpm dev

# Mitosis 编译（源码 → React/Vue/Svelte）
pnpm compile

# 构建所有包
pnpm build

# 运行测试
pnpm test

# 类型检查
pnpm typecheck
```

---

## License

MIT
