import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Carry's blog",
  // titleTemplate: '这是什么',
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '文档', link: '/markdown-examples' },
      { text: 'es6', link: '/ES6 Tutorial notes/01.ECMAScript 6 简介' }

    ],
    outline: {
      label: '本页内容',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    sidebar: [
      {
        text: '文档',
        collapsed: true,
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: '面试题', link: '/面试题' },
        ]
      },
      {
        text: 'es6',
        collapsed: true,
        items: [
          { text: '01.ECMAScript 6 简介', link: '/ES6 Tutorial notes/01.ECMAScript 6 简介' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },
  cleanUrls: true,
})
