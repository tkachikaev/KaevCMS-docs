<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({ lang: { type: String, default: 'ru' } })
const ru = computed(() => props.lang !== 'en')
const labels = computed(() => ru.value
  ? { free: 'Бесплатно', example: 'Для чего пригодится', comparison: 'Все модули — кратко', module: 'Модуль', description: 'Назначение', version: 'Версия', price: 'Стоимость' }
  : { free: 'Free', example: 'When to use it', comparison: 'All modules at a glance', module: 'Module', description: 'Purpose', version: 'Version', price: 'Price' }
)

const modules = [
  {
    id: 'donations', version: '1.16.1',
    ru: {
      name: 'Пожертвования',
      description: 'Игрок пополняет баланс монет на сайте через ЮMoney. При включённом обмене монеты можно потратить на игровые предметы, которые попадут в веб-инвентарь.',
      example: 'Принимать пополнения и обменивать монеты на награды.',
      short: 'Пополнение монет и обмен на предметы'
    },
    en: {
      name: 'Donations',
      description: 'Players top up their website coin balance via YooMoney. When enabled, coins can be exchanged for game items delivered to Web Inventory.',
      example: 'Accept top-ups and let players exchange coins for rewards.',
      short: 'Coin top-ups and item exchange'
    }
  },
  {
    id: 'promo-codes', version: '1.4.3',
    ru: {
      name: 'Промокоды',
      description: 'Создавайте промокоды с подарками для выбранного игрового сервера. Игрок активирует код и получает предметы в свой веб-инвентарь.',
      example: 'Подарок новичкам, участникам конкурса или события.',
      short: 'Подарки игрокам по промокодам'
    },
    en: {
      name: 'Promo Codes',
      description: 'Create gift codes for a selected game server. Players redeem a code to receive items in their Web Inventory.',
      example: 'Give new players or event participants a welcome gift.',
      short: 'Redeemable item rewards'
    }
  },
  {
    id: 'daily-rewards', version: '1.3.3',
    ru: {
      name: 'Ежедневные награды',
      description: 'Календарь ежедневных подарков: настройте награды на каждый день месяца. Игрок забирает доступный подарок для своего игрового аккаунта.',
      example: 'Поощрять игроков заходить каждый день.',
      short: 'Календарь ежедневных подарков'
    },
    en: {
      name: 'Daily Rewards',
      description: 'A daily gift calendar. Configure rewards for each day of the month; players claim available gifts for their game account.',
      example: 'Reward players for coming back regularly.',
      short: 'Daily gift calendars'
    }
  },
  {
    id: 'support-tickets', version: '1.7.3',
    ru: {
      name: 'Техническая поддержка',
      description: 'Игрок пишет администрации прямо из личного кабинета. Сотрудники отвечают, меняют статус обращения и получают уведомления.',
      example: 'Разбирать вопросы игроков без отдельного мессенджера.',
      short: 'Личные обращения игроков в поддержку'
    },
    en: {
      name: 'Support Tickets',
      description: 'Players contact administrators from the account area. Staff reply, manage ticket status and receive notifications.',
      example: 'Handle player questions without a separate messenger.',
      short: 'Private player support conversations'
    }
  }
]

const localized = item => item[ru.value ? 'ru' : 'en']
const iconSrc = item => withBase(`/modules/${item.id}.webp`)
</script>

<template>
  <section class="module-overview" :aria-label="ru ? 'Каталог модулей' : 'Module catalog'">
    <div class="module-grid">
      <article v-for="item in modules" :key="item.id" class="module-card">
        <div class="module-card__top">
          <img class="module-card__art" :src="iconSrc(item)" alt="" aria-hidden="true" width="92" height="92" loading="lazy" />
          <div class="module-card__title">
            <h2 :id="item.id">{{ localized(item).name }}</h2>
            <div class="module-card__meta">
              <span class="module-version">v{{ item.version }}</span>
              <span class="module-badge">{{ labels.free }}</span>
            </div>
          </div>
        </div>
        <p class="module-card__text">{{ localized(item).description }}</p>
        <p class="module-card__docs"><a :href="withBase((ru ? '/guide/' : '/en/guide/') + item.id)">{{ ru ? 'Открыть документацию →' : 'Open documentation →' }}</a></p>
        <div class="module-sample">
          <div class="module-sample__label">{{ labels.example }}</div>
          <p class="module-sample__value">{{ localized(item).example }}</p>
        </div>
      </article>
    </div>
    <h2>{{ labels.comparison }}</h2>
    <div class="module-table-wrap">
      <table class="module-table">
        <thead>
          <tr>
            <th>{{ labels.module }}</th>
            <th>{{ labels.description }}</th>
            <th>{{ labels.version }}</th>
            <th>{{ labels.price }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in modules" :key="item.id">
            <td class="module-table__name">
              <span class="module-table__module">
                <img class="module-table__art" :src="iconSrc(item)" alt="" aria-hidden="true" width="34" height="34" loading="lazy" />
                <span>{{ localized(item).name }}</span>
              </span>
            </td>
            <td>{{ localized(item).short }}</td>
            <td class="module-table__version">{{ item.version }}</td>
            <td><span class="module-badge">{{ labels.free }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.module-card__docs { margin: 0.5rem 0 0; font-weight: 600; }
.module-card__docs a { color: var(--vp-c-brand-1); }
.module-card__docs a:hover { text-decoration: underline; }
</style>
