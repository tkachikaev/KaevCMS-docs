<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import GoldenParticles from './GoldenParticles.vue'

const props = defineProps({
  lang: { type: String, default: 'ru' }
})

const isEnglish = computed(() => props.lang === 'en')
const asset = (path) => withBase(path)

const content = computed(() => isEnglish.value ? {
  eyebrow: 'OPEN-SOURCE CMS',
  heading: 'Lineage II management',
  description: 'An open-source CMS for game server websites. Your public website, player account area, administration and game database integration — all in one project.',
  install: 'Get started',
  download: 'Download on GitHub',
  source: 'Source code',
  strengths: [
    { icon: 'shield', title: 'Open source' },
    { icon: 'box', title: 'Modular architecture' },
    { icon: 'users', title: 'Community & support' }
  ],
  features: [
    { icon: 'puzzle', title: 'Modules and customization', description: 'Optional modules, public website and player-account themes, and multilingual content.', action: 'Explore modules', href: '/en/guide/modules', artwork: 'modules' },
    { icon: 'gamepad', title: 'Lineage II integration', description: 'Separate LoginServer and GameServer connections, compatibility drivers and database diagnostics.', action: 'Connect a server', href: '/en/guide/game-servers', artwork: 'game' },
    { icon: 'person', title: 'Player account area', description: 'Game accounts, characters, Web Inventory and other build-dependent features.', action: 'Explore features', href: '/en/guide/overview', artwork: 'account' }
  ],
  techTitle: 'Built on proven technologies',
  techDescription: 'A modern foundation for a Lineage II website, compatible with VPS and shared hosting.',
  tech: [
    { name: 'PHP 8.3+', detail: 'Server-side runtime' },
    { name: 'Laravel', detail: 'Application framework' },
    { name: 'Livewire', detail: 'Interactive interfaces' },
    { name: 'MySQL / MariaDB', detail: 'Database engine' }
  ],
  moreTitle: 'Everything for your server website',
  moreDescription: 'From the first installation to everyday administration — reference materials in one place.',
  more: [
    { title: 'Secure deployment', detail: 'VPS setup, application permissions and HTTPS', href: '/en/guide/vds' },
    { title: 'Updating KaevCMS', detail: 'Upgrade guides for VPS and shared hosting', href: '/en/guide/updates' },
    { title: 'Troubleshooting', detail: 'Common issues and practical solutions', href: '/en/guide/troubleshooting' }
  ],
  note: 'Features depend on the installed release and game-server integration. Check the release notes before updating.',
  releases: 'Release notes',
  overview: 'Documentation overview',
  overviewLink: '/en/guide/overview'
} : {
  eyebrow: 'ОТКРЫТАЯ CMS',
  heading: 'Управление Lineage II',
  description: 'Открытая CMS для сайтов игровых серверов. Публичный сайт, кабинет игрока, администрирование и интеграция с игровыми базами — в одном проекте.',
  install: 'Начать установку',
  download: 'Скачать с GitHub',
  source: 'Исходный код',
  strengths: [
    { icon: 'shield', title: 'Открытый исходный код' },
    { icon: 'box', title: 'Гибкая модульная система' },
    { icon: 'users', title: 'Сообщество и поддержка' }
  ],
  features: [
    { icon: 'puzzle', title: 'Модули и настройка', description: 'Расширяемая система модулей, оформление публичного сайта и личного кабинета, локализация.', action: 'Смотреть все модули', href: '/guide/modules', artwork: 'modules' },
    { icon: 'gamepad', title: 'Подключение Lineage II', description: 'Раздельные подключения LoginServer и GameServer, поддержка драйверов и диагностика игровых баз.', action: 'Подключить сервер', href: '/guide/game-servers', artwork: 'game' },
    { icon: 'person', title: 'Личный кабинет игрока', description: 'Игровые аккаунты, персонажи, веб-инвентарь и другие функции, доступные с учётом сборки сервера.', action: 'Возможности', href: '/guide/overview', artwork: 'account' }
  ],
  techTitle: 'Технологии KaevCMS',
  techDescription: 'Современный технологический стек для сайта Lineage II. Подходит для VDS и обычного виртуального хостинга.',
  tech: [
    { name: 'PHP 8.3+', detail: 'Серверная платформа' },
    { name: 'Laravel', detail: 'Основа CMS' },
    { name: 'Livewire', detail: 'Интерактивные интерфейсы' },
    { name: 'MySQL / MariaDB', detail: 'База данных' }
  ],
  moreTitle: 'Всё для сайта игрового сервера',
  moreDescription: 'От первой установки до ежедневного администрирования — инструкции в одном месте.',
  more: [
    { title: 'Безопасная установка', detail: 'Развёртывание на VDS, права доступа и HTTPS', href: '/guide/vds' },
    { title: 'Обновления KaevCMS', detail: 'Инструкции для VDS и виртуального хостинга', href: '/guide/updates' },
    { title: 'Решение проблем', detail: 'Частые ошибки и способы их исправления', href: '/guide/troubleshooting' }
  ],
  note: 'Доступные возможности зависят от релиза CMS и драйвера игрового сервера. Перед обновлением проверяйте описание релиза.',
  releases: 'История версий',
  overview: 'О документации',
  overviewLink: '/guide/overview'
})

const github = 'https://github.com/tkachikaev/KaevCMS'
const releases = github + '/releases'
</script>

<template>
  <main class="kaev-home">
    <section class="kaev-home__hero" aria-labelledby="kaev-home-title">
      <div class="kaev-home__hero-image" aria-hidden="true"></div>
      <img class="kaev-home__hero-image kaev-home__hero-image--night" :src="asset('/images/hero-dark-elf.png')" alt="" aria-hidden="true" width="1672" height="941" decoding="async" />
      <div class="kaev-home__hero-overlay" aria-hidden="true"></div>
      <GoldenParticles />
      <div class="kaev-home__hero-content">
        <div class="kaev-home__intro">
          <p class="kaev-home__eyebrow"><span class="kaev-home__spark">✧</span> {{ content.eyebrow }} <span class="kaev-home__eyebrow-line" aria-hidden="true"></span></p>
          <h1 id="kaev-home-title" class="kaev-home__brand">
            <img class="kaev-home__brand-logo" :src="asset('/images/kaevcms-wordmark.webp')" alt="KaevCMS" width="920" height="184" decoding="async" />
          </h1>
          <p class="kaev-home__headline">{{ content.heading }}</p>
          <p class="kaev-home__description">{{ content.description }}</p>
          <div class="kaev-home__actions">
            <a class="kaev-home__button kaev-home__button--primary" :href="asset(isEnglish ? '/en/guide/getting-started' : '/guide/getting-started')">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3h14v-3" /></svg>
              {{ content.install }}
            </a>
            <a class="kaev-home__button kaev-home__button--secondary" :href="releases" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 19c-4 1.5-4-2.5-6-3m12 6v-3.7a3.2 3.2 0 0 0-.8-2.5c2.7-.3 5.5-1.3 5.5-6a4.8 4.8 0 0 0-1.3-3.3 4.5 4.5 0 0 0-.1-3.3s-1 0-3.3 1.8a11.4 11.4 0 0 0-6 0C6.7 3.2 5.7 3.2 5.7 3.2a4.5 4.5 0 0 0-.1 3.3 4.8 4.8 0 0 0-1.3 3.3c0 4.7 2.8 5.7 5.5 6a3.2 3.2 0 0 0-.8 2.5V22" /></svg>
              {{ content.download }}
              <span aria-hidden="true">↗</span>
            </a>
            <a class="kaev-home__button kaev-home__button--secondary" :href="github" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 28" /></svg>
              {{ content.source }}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div class="kaev-home__strengths" :aria-label="isEnglish ? 'Product advantages' : 'Преимущества продукта'">
            <div v-for="strength in content.strengths" :key="strength.icon" class="kaev-home__strength">
              <span class="kaev-home__strength-icon" aria-hidden="true">
                <svg v-if="strength.icon === 'shield'" viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5 3.2 8.7 8 11 4.8-2.3 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>
                <svg v-else-if="strength.icon === 'box'" viewBox="0 0 24 24"><path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm0 10 9-5m-9 5L3 7m9 5v10"/></svg>
                <svg v-else viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2Zm14-16a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 5v1"/></svg>
              </span>
              <span>{{ strength.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="kaev-home__features" :aria-label="isEnglish ? 'Key features' : 'Основные возможности'">
      <div class="kaev-home__feature-grid">
        <article v-for="feature in content.features" :key="feature.icon" class="kaev-home__feature" :class="'kaev-home__feature--' + feature.artwork">
          <span class="kaev-home__feature-icon" aria-hidden="true">
            <svg v-if="feature.icon === 'puzzle'" viewBox="0 0 24 24"><path d="M3 3h7v4a2.5 2.5 0 1 0 4 0V3h7v7h-4a2.5 2.5 0 1 0 0 4h4v7h-7v-4a2.5 2.5 0 1 0-4 0v4H3v-7h4a2.5 2.5 0 1 0 0-4H3V3Z"/></svg>
            <svg v-else-if="feature.icon === 'gamepad'" viewBox="0 0 24 24"><path d="M7 8h10a4 4 0 0 1 3.9 3l1.3 5.5a3 3 0 0 1-4.7 3.1L15 17H9l-2.5 2.6a3 3 0 0 1-4.7-3.1L3 11a4 4 0 0 1 4-3Z"/><path d="M7 11v5m-2.5-2.5h5M16.5 12h.01M19 14h.01"/></svg>
            <svg v-else viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2H4Z"/></svg>
          </span>
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.description }}</p>
          <a class="kaev-home__feature-link" :href="asset(feature.href)">{{ feature.action }} <span aria-hidden="true">→</span></a>
        </article>
      </div>
    </section>

    <section class="kaev-home__technology" :aria-label="content.techTitle">
      <div class="kaev-home__technology-panel">
        <div class="kaev-home__technology-intro">
          <h2>{{ content.techTitle }}</h2>
          <p>{{ content.techDescription }}</p>
        </div>
        <div class="kaev-home__technology-grid">
          <div v-for="item in content.tech" :key="item.name" class="kaev-home__technology-item">
            <strong>{{ item.name }}</strong>
            <span>{{ item.detail }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="kaev-home__more" aria-labelledby="kaev-home-more-title">
      <div class="kaev-home__more-heading">
        <h2 id="kaev-home-more-title">{{ content.moreTitle }}</h2>
        <p>{{ content.moreDescription }}</p>
      </div>
      <div class="kaev-home__more-grid">
        <a v-for="link in content.more" :key="link.href" :href="asset(link.href)" class="kaev-home__more-card">
          <span class="kaev-home__more-text"><strong>{{ link.title }}</strong><small>{{ link.detail }}</small></span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div class="kaev-home__footnote">
        <p>{{ content.note }}</p>
        <nav :aria-label="isEnglish ? 'Additional resources' : 'Дополнительные ресурсы'">
          <a :href="releases">{{ content.releases }} ↗</a>
          <a :href="asset(content.overviewLink)">{{ content.overview }} →</a>
        </nav>
      </div>
    </section>
  </main>
</template>
