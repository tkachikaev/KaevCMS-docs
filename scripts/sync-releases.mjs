import { readFile, writeFile, readdir, mkdir, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
function generate(raw){
 const prefix="https://github.com/tkachikaev/KaevCMS/releases/";
 const clean=s=>String(s||"").replace(/\r/g,"").replace(/<!--[\s\S]*?-->/g,"").replace(/<br\s*\/?>/gi,"\n").replace(/<\/?strong\s*>/gi,"**").replace(/<\/?em\s*>/gi,"*").replace(/<[^>]*>/g,"").trim();
 const notes=(body,lang)=>{
  const d=[...String(body||"").matchAll(/<details(?:\s[^>]*)?>\s*<summary(?:\s[^>]*)?>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi)];
  const p=d.find(m=>lang==="ru"?/русск|🇷🇺/i.test(clean(m[1])):/english|🇬🇧/i.test(clean(m[1])));
  return clean(p?p[2]:body)||(lang==="ru"?"Описание отсутствует.":"No release notes available.");
 };
 const versions=raw.filter(r=>!r.draft&&r.published_at&&/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,90}$/.test(r.tag_name||"")&&!r.tag_name.includes("..")&&String(r.html_url||"").startsWith(prefix))
 .sort((a,b)=>new Date(b.published_at)-new Date(a.published_at))
 .map(r=>({tag:r.tag_name,slug:"v-"+r.tag_name,date:r.published_at.slice(0,10),prerelease:!!r.prerelease,url:r.html_url,ru:notes(r.body,"ru"),en:notes(r.body,"en"),
 assets:(r.assets||[]).filter(a=>String(a.browser_download_url||"").startsWith(prefix+"download/")).map(a=>({name:String(a.name||"").replace(/[|\r\n]/g," "),url:a.browser_download_url,size:a.size||0}))}));
 if(!versions.length)throw new Error("No public GitHub releases");
 const files={};
 const metadata=versions.map(({tag,slug,date,prerelease,url,assets})=>({tag,slug,date,prerelease,url,assetCount:assets.length}));
 files["docs/.vitepress/releases.generated.mjs"]="// Generated from GitHub published releases.\nexport const releases = "+JSON.stringify(metadata,null,2)+";\n";
 for(const lang of ["ru","en"]){
  const ru=lang==="ru",dir=ru?"docs/releases/":"docs/en/releases/";
  files[dir+"index.md"]=["---","title: "+JSON.stringify(ru?"Релизы KaevCMS":"KaevCMS releases"),"description: "+JSON.stringify(ru?"История версий и файлы для скачивания":"Versions and official downloads"),"editLink: false","lastUpdated: false","---","","<ReleaseCatalog lang=\""+lang+"\" />",""].join("\n");
  for(const r of versions){
   const fileTable=r.assets.length?"| "+(ru?"Файл":"File")+" | "+(ru?"Размер":"Size")+" |\n| --- | ---: |\n"+r.assets.map(a=>"| ["+a.name+"]("+a.url+") | "+(a.size?(a.size/1048576).toFixed(1)+" MB":"—")+" |").join("\n"):(ru?"Файлы не прикреплены.":"No assets attached.");
   files[dir+r.slug+".md"]=[
   "---","title: "+JSON.stringify("KaevCMS "+r.tag),"description: "+JSON.stringify(ru?"Изменения версии "+r.tag:"Release "+r.tag+" notes"),"editLink: false","lastUpdated: false","---","",
   "# KaevCMS "+r.tag,"",
   "**"+(ru?"Опубликовано":"Published")+":** "+r.date+" · **"+(ru?"Тип":"Type")+":** "+(r.prerelease?(ru?"Предварительная версия":"Pre-release"):(ru?"Стабильный релиз":"Stable release")),"",
   "["+(ru?"Оригинал на GitHub ↗":"Original release on GitHub ↗")+"]("+r.url+")","",
   "## "+(ru?"Что нового":"What's new"),"",ru?r.ru:r.en,"",
   "## "+(ru?"Файлы для скачивания":"Download files"),"",fileTable,"",
   "::: warning "+(ru?"Перед установкой":"Before installation"),ru?"Проверяйте совместимость версий и делайте резервную копию. Полные архивы и обновления не взаимозаменяемы.":"Check version compatibility and keep a backup. Full installations and update packages are different.",":::","",
   "["+(ru?"Все релизы":"All releases")+"]("+(ru?"/releases/":"/en/releases/")+") · ["+(ru?"Обновление":"Updating")+"]("+(ru?"/guide/updates":"/en/guide/updates")+")",""].join("\n");
  }
 }
 return {files,metadata};
}
async function run(){
  const all=[];
  try {
    const token=process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    for(let i=1;i<=10;i++){
      const response=await fetch('https://api.github.com/repos/tkachikaev/KaevCMS/releases?per_page=100&page='+i,{
        headers:{Accept:'application/vnd.github+json','User-Agent':'KaevCMS-release-docs',...(token?{Authorization:'Bearer '+token}:{})},
        signal:AbortSignal.timeout(20000)
      });
      if(!response.ok)throw new Error('GitHub API: '+response.status);
      const chunk=await response.json();if(!Array.isArray(chunk))throw new Error('Invalid GitHub response');
      all.push(...chunk);if(chunk.length<100)break;
    }
    const {files}=generate(all);
    for(const [path,source] of Object.entries(files)){
      const dest=join(root,path);await mkdir(dirname(dest),{recursive:true});
      let current=null;try{current=await readFile(dest,'utf8')}catch{}
      if(source!==current)await writeFile(dest,source,'utf8');
    }
    for(const prefix of ['docs/releases/','docs/en/releases/']){
      const dir=join(root,prefix),expected=new Set(Object.keys(files).filter(p=>p.startsWith(prefix)).map(p=>p.slice(prefix.length)));
      for(const item of await readdir(dir)){
        if(/^v-[A-Za-z0-9][A-Za-z0-9._-]*\.md$/.test(item)&&!expected.has(item))await rm(join(dir,item));
      }
    }
    console.log('Synced '+all.filter(r=>!r.draft&&r.published_at).length+' published releases');
  }catch(error){
    try{await readFile(join(root,'docs/.vitepress/releases.generated.mjs'),'utf8');
      console.warn('GitHub API unavailable; using cached release snapshot:',error.message);
    }catch{throw error;}
  }
}
run().catch(e=>{console.error(e);process.exitCode=1;});
