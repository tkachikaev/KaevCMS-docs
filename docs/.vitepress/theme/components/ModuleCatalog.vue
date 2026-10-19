<script setup>
import { computed } from 'vue'

const props = defineProps({ lang: { type: String, default: 'ru' } })
const ru = computed(() => props.lang !== 'en')
const labels = computed(() => ru.value
  ? { free: 'Бесплатно', example: 'Для чего пригодится', comparison: 'Все модули — кратко', module: 'Модуль', description: 'Назначение', version: 'Версия', price: 'Стоимость' }
  : { free: 'Free', example: 'When to use it', comparison: 'All modules at a glance', module: 'Module', description: 'Purpose', version: 'Version', price: 'Price' }
)
const modules = [
  {
    id: 'donations', name: 'Donations', version: '1.16.0', icon: '◉',
    ru: {
      description: 'Игрок пополняет баланс монет на сайте через ЮMoney. При включённом обмене монеты можно потратить на игровые предметы, которые попадут в веб-инвентарь.',
      example: 'Принимать пополнения и обменивать монеты на награды.',
      short: 'Пополнение монет и обмен на предметы'
    },
    en: {
      description: 'Players top up their website coin balance via YooMoney. When enabled, coins can be exchanged for game items delivered to Web Inventory.',
      example: 'Accept top-ups and let players exchange coins for rewards.',
      short: 'Coin top-ups and item exchange'
    }
  },
  {
    id: 'promo-codes', name: 'Promo Codes', version: '1.4.2', icon: '◇',
    ru: {
      description: 'Создавайте промокоды с подарками для выбранного игрового сервера. Игрок активирует код и получает предметы в свой веб-инвентарь.',
      example: 'Подарок новичкам, участникам конкурса или события.',
      short: 'Подарки игрокам по промокодам'
    },
    en: {
      description: 'Create gift codes for a selected game server. Players redeem a code to receive items in their Web Inventory.',
      example: 'Give new players or event participants a welcome gift.',
      short: 'Redeemable item rewards'
    }
  },
  {
    id: 'daily-rewards', name: 'Daily Rewards', version: '1.3.2', icon: '▦',
    ru: {
      description: 'Календарь ежедневных подарков: настройте награды на каждый день месяца. Игрок забирает доступный подарок для своего игрового аккаунта.',
      example: 'Поощрять игроков заходить каждый день.',
      short: 'Календарь ежедневных подарков'
    },
    en: {
      description: 'A daily gift calendar. Configure rewards for each day of the month; players claim available gifts for their game account.',
      example: 'Reward players for coming back regularly.',
      short: 'Daily gift calendars'
    }
  },
  {
    id: 'support-tickets', name: 'Support Tickets', version: '1.7.2', icon: '▤',
    ru: {
      description: 'Игрок пишет администрации прямо из личного кабинета. Сотрудники отвечают, меняют статус обращения и получают уведомления.',
      example: 'Разбирать вопросы игроков без отдельного мессенджера.',
      short: 'Личные обращения игроков в поддержку'
    },
    en: {
      description: 'Players contact administrators from the account area. Staff reply, manage ticket status and receive notifications.',
      example: 'Handle player questions without a separate messenger.',
      short: 'Private player support conversations'
    }
  }
]
</script>

<template>
  <section class="module-overview" :aria-label="ru ? 'Каталог модулей' : 'Module catalog'">
    <div class="module-grid">
      <article v-for="item in modules" :key="item.id" class="module-card">
        <div class="module-card__top">
          <span class="module-card__icon" :class="'module-card__icon--' + item.id" aria-hidden="true">{{ item.icon }}</span>
          <div class="module-card__title">
            <h2 :id="item.id">{{ item.name }}</h2>
            <span class="module-version">v{{ item.version }}</span>
          </div>
          <span class="module-badge">{{ labels.free }}</span>
        </div>
        <p class="module-card__text">{{ item[ru ? 'ru' : 'en'].description }}</p>
        <div class="module-sample">
          <div class="module-sample__label">{{ labels.example }}</div>
          <p class="module-sample__value">{{ item[ru ? 'ru' : 'en'].example }}</p>
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
            <td class="module-table__name">{{ item.name }}</td>
            <td>{{ item[ru ? 'ru' : 'en'].short }}</td>
            <td class="module-table__version">{{ item.version }}</td>
            <td><span class="module-badge">{{ labels.free }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
