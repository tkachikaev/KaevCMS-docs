<script setup>
import {computed} from 'vue'
import {withBase} from 'vitepress'
import {releases} from '../../releases.generated.mjs'
const props=defineProps({lang:{type:String,default:'ru'}})
const ru=computed(()=>props.lang!=='en')
const t=computed(()=>ru.value?{k:'История развития',title:'Релизы KaevCMS',desc:'Выберите версию, чтобы прочитать описание изменений и скачать файлы с GitHub.',last:'Последняя опубликованная',more:'Подробнее о версии',pre:'Предварительная версия',stable:'Стабильная версия',files:'файлов',source:'Все релизы на GitHub'}:{k:'Release history',title:'KaevCMS releases',desc:'Choose a version to read its changelog and download official files from GitHub.',last:'Latest published',more:'Release notes',pre:'Pre-release',stable:'Stable release',files:'files',source:'All releases on GitHub'})
const href=v=>withBase((ru.value?'/releases/':'/en/releases/')+v.slug)
const date=v=>new Intl.DateTimeFormat(ru.value?'ru-RU':'en-US',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(new Date(v+'T12:00:00Z'))
</script>
<template>
<section class="kaev-release-catalog">
  <header class="kaev-release-intro"><span class="kaev-release-kicker">✧ {{t.k}}</span><h1>{{t.title}}</h1><p>{{t.desc}}</p></header>
  <div class="kaev-release-grid">
    <a v-for="(v,i) in releases" :key="v.tag" :href="href(v)" class="kaev-release-tile" :class="{'kaev-release-tile--last':i===0}">
      <span class="kaev-release-tile__label">{{i===0?t.last:date(v.date)}}</span>
      <strong class="kaev-release-tile__title">KaevCMS {{v.tag}}</strong>
      <span class="kaev-release-tile__desc">{{v.prerelease?t.pre:t.stable}} · {{v.assetCount}} {{t.files}}</span>
      <span class="kaev-release-tile__link">{{t.more}} →</span>
    </a>
  </div>
  <p class="kaev-release-footer"><a href="https://github.com/tkachikaev/KaevCMS/releases" target="_blank" rel="noopener noreferrer">{{t.source}} ↗</a></p>
</section>
</template>
