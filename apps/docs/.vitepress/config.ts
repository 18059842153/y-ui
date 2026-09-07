import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Y-UI',
  description: 'Cross-framework lightweight component library',
  base: '/y-ui/',

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/installation' },
      { text: 'Components', link: '/components/button' },
      { text: 'Theming', link: '/theming/tokens' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/guide/installation' },
            { text: 'CLI', link: '/guide/cli' },
            { text: 'CDN', link: '/guide/cdn' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Input', link: '/components/input' },
            { text: 'Select', link: '/components/select' },
            { text: 'Dialog', link: '/components/dialog' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Card', link: '/components/card' },
            { text: 'Icon', link: '/components/icon' },
            { text: 'FormField', link: '/components/form-field' },
          ],
        },
      ],
      '/theming/': [
        {
          text: 'Theming',
          items: [
            { text: 'Token Architecture', link: '/theming/tokens' },
            { text: 'Dark Mode', link: '/theming/dark-mode' },
            { text: 'RTL Support', link: '/theming/rtl' },
            { text: 'Theme Editor', link: '/theming/editor' },
          ],
        },
      ],
      '/forms/': [
        {
          text: 'Forms',
          items: [
            { text: 'React Hook Form', link: '/forms/react-hook-form' },
            { text: 'VeeValidate', link: '/forms/vee-validate' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/chenkc-afk/y-ui' },
    ],
    footer: {
      message: 'Released under the MIT License.',
    },
  },
})
