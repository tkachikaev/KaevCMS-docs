import { defineConfig } from 'vitepress'
import { releases } from './releases.generated.mjs'

const source = 'https://github.com/tkachikaev/KaevCMS'
const docsRepo = 'https://github.com/tkachikaev/KaevCMS-docs'
const releaseLabel = r => `${r.tag} (${r.date.slice(8, 10)}.${r.date.slice(5, 7)}.${r.date.slice(0, 4)})`
const ruReleaseSidebar=[{text:'Версии KaevCMS',items:[{text:'Все релизы',link:'/releases/'},...releases.map(r=>({text:releaseLabel(r),link:'/releases/'+r.slug}))]}]
const enReleaseSidebar=[{text:'KaevCMS versions',items:[{text:'All releases',link:'/en/releases/'},...releases.map(r=>({text:releaseLabel(r),link:'/en/releases/'+r.slug}))]}]
const ruSidebar = [
  {
    "text": "Документация",
    "link": "/guide/",
    "collapsed": false,
    "items": [
      {
        "text": "Начало",
        "link": "/guide/",
        "collapsed": true,
        "items": [
          {
            "text": "Обзор KaevCMS",
            "link": "/guide/overview"
          },
          {
            "text": "Быстрый старт",
            "link": "/guide/getting-started"
          }
        ]
      },
      {
        "text": "Установка",
        "link": "/guide/installation",
        "collapsed": true,
        "items": [
          {
            "text": "Ubuntu / VDS",
            "link": "/guide/vds"
          },
          {
            "text": "Виртуальный хостинг",
            "link": "/guide/shared-hosting"
          }
        ]
      },
      {
        "text": "Работа с CMS",
        "link": "/guide/administration",
        "collapsed": true,
        "items": [
          {
            "text": "Администрирование",
            "link": "/guide/administration"
          },
          {
            "text": "Игровые серверы",
            "link": "/guide/game-servers"
          },
          {
            "text": "Передача предметов",
            "link": "/guide/reward-delivery"
          },
          {
            "text": "Почта",
            "link": "/guide/mail",
            "collapsed": true,
            "items": [
              {
                "text": "Режимы отправки",
                "link": "/guide/mail-modes"
              }
            ]
          }
        ]
      },
      {
        "text": "Модули",
        "link": "/guide/modules",
        "collapsed": false,
        "items": [
          {
            "text": "Пожертвования",
            "link": "/guide/donations",
            "collapsed": true,
            "items": [
              {
                "text": "Провайдеры",
                "link": "/guide/donations-providers",
                "collapsed": true,
                "items": [
                  {
                    "text": "ЮMoney",
                    "link": "/guide/donations-yoomoney"
                  }
                ]
              },
              {
                "text": "Перевод монет в игру",
                "link": "/guide/donations-exchange"
              }
            ]
          },
          {
            "text": "Промокоды",
            "link": "/guide/promo-codes",
            "collapsed": true,
            "items": [
              {
                "text": "Создать промокод",
                "link": "/guide/promo-codes-create"
              }
            ]
          },
          {
            "text": "Ежедневные награды",
            "link": "/guide/daily-rewards",
            "collapsed": true,
            "items": [
              {
                "text": "Создать календарь",
                "link": "/guide/daily-rewards-calendar"
              }
            ]
          },
          {
            "text": "Техподдержка",
            "link": "/guide/support-tickets",
            "collapsed": true,
            "items": [
              {
                "text": "Настройки",
                "link": "/guide/support-tickets-settings"
              },
              {
                "text": "Работа с обращениями",
                "link": "/guide/support-tickets-requests"
              }
            ]
          }
        ]
      },
      {
        "text": "Обновления",
        "link": "/guide/updates"
      },
      {
        "text": "Помощь",
        "link": "/guide/troubleshooting",
        "collapsed": true,
        "items": [
          {
            "text": "Решение проблем",
            "link": "/guide/troubleshooting"
          },
          {
            "text": "Частые вопросы",
            "link": "/guide/faq"
          },
          {
            "text": "Источники и поддержка",
            "link": "/guide/support"
          }
        ]
      },
      {
        "text": "Ресурсы",
        "link": "/resources/"
      }
    ]
  }
]
const enSidebar = [
  {
    "text": "Documentation",
    "link": "/en/guide/",
    "collapsed": false,
    "items": [
      {
        "text": "Start here",
        "link": "/en/guide/",
        "collapsed": true,
        "items": [
          {
            "text": "About KaevCMS",
            "link": "/en/guide/overview"
          },
          {
            "text": "Quick start",
            "link": "/en/guide/getting-started"
          }
        ]
      },
      {
        "text": "Installation",
        "link": "/en/guide/installation",
        "collapsed": true,
        "items": [
          {
            "text": "Ubuntu / VPS",
            "link": "/en/guide/vds"
          },
          {
            "text": "Shared hosting",
            "link": "/en/guide/shared-hosting"
          }
        ]
      },
      {
        "text": "Using KaevCMS",
        "link": "/en/guide/administration",
        "collapsed": true,
        "items": [
          {
            "text": "Administration",
            "link": "/en/guide/administration"
          },
          {
            "text": "Game servers",
            "link": "/en/guide/game-servers"
          },
          {
            "text": "Item delivery",
            "link": "/en/guide/reward-delivery"
          },
          {
            "text": "Mail",
            "link": "/en/guide/mail",
            "collapsed": true,
            "items": [
              {
                "text": "Delivery modes",
                "link": "/en/guide/mail-modes"
              }
            ]
          }
        ]
      },
      {
        "text": "Modules",
        "link": "/en/guide/modules",
        "collapsed": false,
        "items": [
          {
            "text": "Donations",
            "link": "/en/guide/donations",
            "collapsed": true,
            "items": [
              {
                "text": "Providers",
                "link": "/en/guide/donations-providers",
                "collapsed": true,
                "items": [
                  {
                    "text": "YooMoney",
                    "link": "/en/guide/donations-yoomoney"
                  }
                ]
              },
              {
                "text": "Coin exchange",
                "link": "/en/guide/donations-exchange"
              }
            ]
          },
          {
            "text": "Promo Codes",
            "link": "/en/guide/promo-codes",
            "collapsed": true,
            "items": [
              {
                "text": "Create a promo code",
                "link": "/en/guide/promo-codes-create"
              }
            ]
          },
          {
            "text": "Daily Rewards",
            "link": "/en/guide/daily-rewards",
            "collapsed": true,
            "items": [
              {
                "text": "Create a calendar",
                "link": "/en/guide/daily-rewards-calendar"
              }
            ]
          },
          {
            "text": "Support Tickets",
            "link": "/en/guide/support-tickets",
            "collapsed": true,
            "items": [
              {
                "text": "Settings",
                "link": "/en/guide/support-tickets-settings"
              },
              {
                "text": "Manage tickets",
                "link": "/en/guide/support-tickets-requests"
              }
            ]
          }
        ]
      },
      {
        "text": "Updates",
        "link": "/en/guide/updates"
      },
      {
        "text": "Help",
        "link": "/en/guide/troubleshooting",
        "collapsed": true,
        "items": [
          {
            "text": "Troubleshooting",
            "link": "/en/guide/troubleshooting"
          },
          {
            "text": "FAQ",
            "link": "/en/guide/faq"
          },
          {
            "text": "Sources and support",
            "link": "/en/guide/support"
          }
        ]
      },
      {
        "text": "Resources",
        "link": "/en/resources/"
      }
    ]
  }
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
          { text: 'Документация', link: '/guide/' },
          { text: 'Модули', link: '/guide/modules' },
          { text: 'Обновления', link: '/guide/updates' },
          { text: 'Решение проблем', link: '/guide/troubleshooting' },
          { text: 'Ресурсы', link: '/resources/' },
          { text: 'Релизы', link: '/releases/' }
        ],
        sidebar: {'/releases/':ruReleaseSidebar,'/':ruSidebar},
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
          { text: 'Documentation', link: '/en/guide/' },
          { text: 'Modules', link: '/en/guide/modules' },
          { text: 'Updates', link: '/en/guide/updates' },
          { text: 'Troubleshooting', link: '/en/guide/troubleshooting' },
          { text: 'Resources', link: '/en/resources/' },
          { text: 'Releases', link: '/en/releases/' }
        ],
        sidebar: {'/en/releases/':enReleaseSidebar,'/en/':enSidebar},
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
    logo: { src: '/brand/kaevcms-k.webp', alt: 'KaevCMS' },
    siteTitle: false,
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: source }]
  }
})

