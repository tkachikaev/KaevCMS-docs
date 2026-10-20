<script setup>
import {ref, computed, watch, onMounted, onUnmounted} from 'vue'
import {withBase} from 'vitepress'
const props=defineProps({lang:{type:String,default:'ru'}})
const isRu=computed(()=>props.lang!=='en')
const tr=computed(()=>isRu.value?{
 kicker:'Коллекция KaevCMS',title:'Игровые ресурсы',intro:'Персонажи, аватарки и игровые предметы для оформления сайта Lineage II. Выбирайте категорию, ищите по имени и открывайте исходные файлы.',
 tabs:['Персонажи','Аватарки','Предметы'],search:'Поиск по имени или пути файла...',all:'Все расы',
 count:'Найдено',show:'Показать ещё',loading:'Загружаем каталог...',none:'Ничего не найдено',failed:'Не удалось загрузить каталог. Откройте исходный репозиторий.',
 original:'Открыть оригинал',file:'Файл',archive:'Скачать всю коллекцию ZIP',source:'Открыть репозиторий',close:'Закрыть',
 hint:'Изображения подгружаются по мере прокрутки. Файлы размещены в KaevCMS-image, а не в репозитории документации.',
 legal:'Изображения, связанные с Lineage II, могут принадлежать правообладателям игры. Учитывайте условия использования перед распространением.',
 more:'Подробнее',race:'Раса',other:'Другие'
}:{
 kicker:'KaevCMS collection',title:'Game assets',intro:'Character artwork, avatars and game item icons for your Lineage II website. Choose a category, search by filename and open the source files.',
 tabs:['Characters','Avatars','Items'],search:'Search file name or path...',all:'All races',
 count:'Found',show:'Load more',loading:'Loading gallery...',none:'No matching files',failed:'Could not load the catalog. Please open the source repository.',
 original:'Open original',file:'File',archive:'Download the full ZIP',source:'View repository',close:'Close',
 hint:'Images load lazily as you scroll. Originals stay in KaevCMS-image rather than the documentation repository.',
 legal:'Lineage II game-related images may be owned by their respective rights holders. Check applicable rights before redistributing.',
 more:'Details',race:'Race',other:'Other'
})
const categories=['characters','avatars','items']
const tab=ref(0)
const files=ref([])
const commit=ref('main')
const status=ref('loading')
const query=ref('')
const race=ref('')
const limit=ref(48)
const selected=ref(null)
const races=['dark_elf','dwarf','elf','ertheia','fallback','human','kamael','orc','sylph']
const raceLabels={dark_elf:['Тёмные эльфы','Dark elves'],dwarf:['Гномы','Dwarves'],elf:['Эльфы','Elves'],ertheia:['Эртеи','Ertheia'],fallback:['Прочие','Other'],human:['Люди','Humans'],kamael:['Камаэли','Kamael'],orc:['Орки','Orcs'],sylph:['Сильфы','Sylphs']}
const formatRace=r=>raceLabels[r]?.[isRu.value?0:1] || r.replaceAll('_',' ')
const counts=computed(()=>[0,1,2].map(k=>files.value.filter(f=>f[0]===k).length))
const filtered=computed(()=>{
 const q=query.value.trim().toLowerCase().replace(/\\s+/g,'_')
 return files.value.filter(f=>f[0]===tab.value&&(!race.value||tab.value!==0||f[1].split('/')[3]===race.value)&&(!q||f[1].toLowerCase().includes(q)||f[1].split('/').pop().replace(/_/g,' ').toLowerCase().includes(q.replaceAll('_',' '))))
})
const shown=computed(()=>filtered.value.slice(0,limit.value))
const src=(f)=>'https://raw.githubusercontent.com/tkachikaev/KaevCMS-image/'+commit.value+'/public/uploads/'+f[1].split('/').map(encodeURIComponent).join('/')
const name=(f)=>{
 const p=f[1].split('/')
 if(f[0]===1)return (isRu.value?'Аватар ':'Avatar ')+p[p.length-1].replace(/\\.webp$/i,'')
 if(f[0]===0)return formatRace(p[3])+' · '+(p[4]==='male'?(isRu.value?'муж.':'male'):p[4]==='female'?(isRu.value?'жен.':'female'):p[4])+' · '+p[p.length-1].replace(/\\.webp$/i,'')
 return p[p.length-1].replace(/\\.webp$/i,'').replace(/_/g,' ')
}
const size=f=>f[2]>=1048576?(f[2]/1048576).toFixed(1)+' MB':(f[2]/1024).toFixed(1)+' KB'
function setTab(k){tab.value=k;race.value='';query.value='';limit.value=48;selected.value=null}
watch([query,race],()=>{limit.value=48})
function escapeClose(e){if(e.key==='Escape')selected.value=null}
onMounted(async()=>{
 window.addEventListener('keydown',escapeClose)
 try{
  const res=await fetch(withBase('/data/image-catalog.json'),{cache:'no-cache'})
  if(!res.ok)throw new Error('HTTP '+res.status)
  const data=await res.json()
  if(!/^[a-f0-9]{40}$/.test(data.commit)||!Array.isArray(data.entries))throw new Error('Invalid image catalog')
  files.value=data.entries.filter(f=>Array.isArray(f)&&f.length===3&&[0,1,2].includes(f[0])&&typeof f[1]==='string'&&!f[1].includes('..')&&f[1].endsWith('.webp'))
  commit.value=data.commit;status.value='ready'
 }catch(e){console.error('Asset gallery:',e);status.value='error'}
})
onUnmounted(()=>{if(typeof window!=='undefined')window.removeEventListener('keydown',escapeClose)})
</script>
<template>
<section class="kaev-gallery" aria-label="KaevCMS assets">
  <header class="kaev-gallery__intro">
    <span class="kaev-gallery__kicker">✧ {{tr.kicker}}</span>
    <h1>{{tr.title}}</h1>
    <p>{{tr.intro}}</p>
    <div class="kaev-gallery__links">
      <a class="kaev-gallery__primary" href="https://github.com/tkachikaev/KaevCMS-image/archive/refs/heads/main.zip" rel="noopener">{{tr.archive}} ↓</a>
      <a href="https://github.com/tkachikaev/KaevCMS-image" target="_blank" rel="noopener noreferrer">{{tr.source}} ↗</a>
    </div>
  </header>
  <div v-if="status==='loading'" class="kaev-gallery__message" role="status">{{tr.loading}}</div>
  <div v-else-if="status==='error'" class="kaev-gallery__message" role="alert">{{tr.failed}} <a href="https://github.com/tkachikaev/KaevCMS-image">{{tr.source}} ↗</a></div>
  <template v-else>
    <div class="kaev-gallery__toolbar">
      <div class="kaev-gallery__tabs" role="tablist" :aria-label="tr.title">
        <button v-for="(label,i) in tr.tabs" :key="i" type="button" role="tab" :id="'asset-tab-'+i" :aria-selected="tab===i" :aria-controls="'asset-panel-'+i" :class="{'is-active':tab===i}" @click="setTab(i)">{{label}} <span>{{counts[i]}}</span></button>
      </div>
      <div class="kaev-gallery__filters">
        <input v-model="query" type="search" :placeholder="tr.search" :aria-label="tr.search" />
        <select v-if="tab===0" v-model="race" :aria-label="tr.race">
          <option value="">{{tr.all}}</option>
          <option v-for="r in races" :key="r" :value="r">{{formatRace(r)}}</option>
        </select>
        <span class="kaev-gallery__count">{{tr.count}}: {{filtered.length.toLocaleString(isRu?'ru-RU':'en-US')}}</span>
      </div>
    </div>
    <div class="kaev-gallery__panel" role="tabpanel" :id="'asset-panel-'+tab" :aria-labelledby="'asset-tab-'+tab">
      <div v-if="!shown.length" class="kaev-gallery__message">{{tr.none}}</div>
      <div v-else class="kaev-gallery__grid">
        <button v-for="file in shown" :key="file[1]" type="button" class="kaev-gallery__tile" @click="selected=file">
          <span class="kaev-gallery__preview" :class="'kaev-gallery__preview--'+categories[tab]">
            <img :src="src(file)" :alt="name(file)" loading="lazy" decoding="async" />
          </span>
          <span class="kaev-gallery__name" :title="name(file)">{{name(file)}}</span>
          <span class="kaev-gallery__size">{{size(file)}}</span>
        </button>
      </div>
      <div v-if="filtered.length>shown.length" class="kaev-gallery__more">
        <button type="button" @click="limit+=48">{{tr.show}} ({{shown.length}} / {{filtered.length}}) ↓</button>
      </div>
    </div>
    <p class="kaev-gallery__hint">{{tr.hint}}</p>
  </template>
  <p class="kaev-gallery__legal">{{tr.legal}}</p>
  <div v-if="selected" class="kaev-gallery__modal-backdrop" role="presentation" @click.self="selected=null">
    <div class="kaev-gallery__modal" role="dialog" aria-modal="true" :aria-label="name(selected)">
      <button type="button" class="kaev-gallery__close" :aria-label="tr.close" @click="selected=null">×</button>
      <div class="kaev-gallery__modal-image"><img :src="src(selected)" :alt="name(selected)" /></div>
      <strong>{{name(selected)}}</strong>
      <p>{{selected[1]}} · {{size(selected)}}</p>
      <a :href="src(selected)" target="_blank" rel="noopener noreferrer">{{tr.original}} ↗</a>
    </div>
  </div>
</section>
</template>
