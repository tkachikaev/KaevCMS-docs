import { defineConfig } from 'vitepress'

const source = 'https://github.com/tkachikaev/KaevCMS'
const docsRepo = 'https://github.com/tkachikaev/KaevCMS-docs'
const ruSidebar = [
  { text: 'Начало', items: [
    { text: 'Обзор KaevCMS', link: '/guide/overview' },
    { text: 'Быстрый старт', link: '/guide/getting-started' }
  ] },
  { text: 'Установка', items: [
    { text: 'Ubuntu / VDS', link: '/guide/vds' },
    { text: 'Виртуальный хостинг', link: '/guide/shared-hosting' }
  ] },
  { text: 'Работа с CMS', items: [
    { text: 'Игровые серверы', link: '/guide/game-servers' },
    { text: 'Администрирование', link: '/guide/administration' }
  ] },
  { text: 'Модули', items: [
    { text: 'Каталог модулей', link: '/guide/modules' }
  ] },
  { text: 'Обновления', items: [
    { text: 'Обновление KaevCMS', link: '/guide/updates' }
  ] },
  { text: 'Помощь', items: [
    { text: 'Решение проблем', link: '/guide/troubleshooting' },
    { text: 'Частые вопросы', link: '/guide/faq' },
    { text: 'Источники и поддержка', link: '/guide/support' }
  ] }
]
const enSidebar = [
  { text: 'Start here', items: [
    { text: 'About KaevCMS', link: '/en/guide/overview' },
    { text: 'Quick start', link: '/en/guide/getting-started' }
  ] },
  { text: 'Installation', items: [
    { text: 'Ubuntu / VPS', link: '/en/guide/vds' },
    { text: 'Shared hosting', link: '/en/guide/shared-hosting' }
  ] },
  { text: 'Using KaevCMS', items: [
    { text: 'Game servers', link: '/en/guide/game-servers' },
    { text: 'Administration', link: '/en/guide/administration' }
  ] },
  { text: 'Modules', items: [
    { text: 'Module catalog', link: '/en/guide/modules' }
  ] },
  { text: 'Updates', items: [
    { text: 'Updating KaevCMS', link: '/en/guide/updates' }
  ] },
  { text: 'Help', items: [
    { text: 'Troubleshooting', link: '/en/guide/troubleshooting' },
    { text: 'FAQ', link: '/en/guide/faq' },
    { text: 'Sources and support', link: '/en/guide/support' }
  ] }
]

export default defineConfig({
  title: 'KaevCMS',
  base: '/KaevCMS-docs/',
  lang: 'ru-RU',
  description: 'Официальный сайт и документация KaevCMS — CMS для серверов Lineage II.',
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#101827' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'KaevCMS' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/KaevCMS-docs/brand/favicon-k.png' }]
  ],
  locales: {
    root: {
      label: 'Русский',
      lang: 'ru-RU',
      themeConfig: {
        nav: [
          { text: 'Главная', link: '/' },
          { text: 'Документация', link: '/guide/getting-started' },
          { text: 'Модули', link: '/guide/modules' },
          { text: 'Обновления', link: '/guide/updates' },
          { text: 'Решение проблем', link: '/guide/troubleshooting' },
          { text: 'Релизы ↗', link: source + '/releases' }
        ],
        sidebar: ruSidebar,
        editLink: { pattern: docsRepo + '/edit/main/docs/:path', text: 'Предложить исправление' },
        docFooter: { prev: 'Назад', next: 'Далее' },
        outline: { label: 'На этой странице' },
        lastUpdated: { text: 'Изменено' },
        returnToTopLabel: 'Вернуться наверх',
        sidebarMenuLabel: 'Разделы',
        darkModeSwitchLabel: 'Оформление',
        langMenuLabel: 'Язык',
        footer: {
          message: 'Независимый открытый проект. Lineage II — собственность правообладателей.',
          copyright: 'KaevCMS · MIT License'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Documentation', link: '/en/guide/getting-started' },
          { text: 'Modules', link: '/en/guide/modules' },
          { text: 'Updates', link: '/en/guide/updates' },
          { text: 'Troubleshooting', link: '/en/guide/troubleshooting' },
          { text: 'Releases ↗', link: source + '/releases' }
        ],
        sidebar: enSidebar,
        editLink: { pattern: docsRepo + '/edit/main/docs/:path', text: 'Suggest an edit' },
        docFooter: { prev: 'Previous', next: 'Next' },
        outline: { label: 'On this page' },
        lastUpdated: { text: 'Updated' },
        returnToTopLabel: 'Back to top',
        sidebarMenuLabel: 'Contents',
        langMenuLabel: 'Language',
        footer: {
          message: 'Independent open-source project. Lineage II belongs to its respective owners.',
          copyright: 'KaevCMS · MIT License'
        }
      }
    }
  },
  themeConfig: {
    logo: '/brand/kaevcms-k.webp',
    siteTitle: 'KaevCMS',
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: source }]
  }
})

