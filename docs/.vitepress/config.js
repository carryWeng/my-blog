import { defineConfig } from 'vitepress'

const fs = require("fs");
const path = require("path");

const docsPath = path.dirname(__dirname); // docs 目录路径
const sidebarConfig = generateSidebarConfig(docsPath);

function generateSidebarConfig(docsPath, link = '', index = 0) {
  const sidebarConfig = {};
  const files = fs.readdirSync(docsPath);

  files.forEach((filename) => {
    if (filename.startsWith(".")) return;
    const filepath = path.join(docsPath, filename);
    const stat = fs.statSync(filepath);
    // 如果是文件夹，则递归生成子级 sidebar 配置
    if (stat.isDirectory()) {
      if (index === 0) {
        const config = generateSidebarConfig(filepath, `/${filename}/`, index + 1);
        if (!sidebarConfig[`/${filename}/`]) {
          sidebarConfig[`/${filename}/`] = [config];
        }
      } else {
        if (!sidebarConfig.items) {
          sidebarConfig.items = [];
        }
        sidebarConfig.items.push(generateSidebarConfig(filepath, `${link}${filename}/`, index + 1))
      }
    } else {
      const extname = path.extname(filepath);
      const basename = path.basename(filepath, extname);
      if (filename === 'index.md' && index > 0) {
        const menuPath = path.dirname(filepath);
        const menuName = path.basename(menuPath) 
        sidebarConfig.text = menuName;
        sidebarConfig.link = link;
      }
      if (extname === ".md" && filename !== "index.md") {
        if (!sidebarConfig.items) {
          sidebarConfig.items = [];
        }
        sidebarConfig.items.push({
          text: basename,
          link: `${link}${basename}`,
        });
      }
    }
  });

  return sidebarConfig;
}



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

    sidebar: sidebarConfig,

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ],
  },
  cleanUrls: true,
})
